import OpenAI from "openai";
import {z} from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
const API_KEY = process.env.REACT_APP_API_KEY;

const quizSchema = (numQuestions) => z.object({
  quiz : z.array(
    z.object({
      question : z.string(),
      answers : z.array(
        z.object({
          option : z.string(),
          isCorrect : z.boolean()
        })
      )
    })
  ),
  numQuestions : numQuestions
})

const client = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true, 
});

export const generateQuestions = async (numQuestions = 5, difficulty = "medium") => {
  const prompt = `Generate a multiple choice quiz that has ${numQuestions} questions of ${difficulty}.
                  Ensure that each question is semantically unique.`;

  let attempt = 0;


  // while (true) {
    try {
      const response = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a Harry Potter expert writing trivia questions based on the Harry Potter Wiki.",
          },
          { role: "user", content: prompt },
        ],
        model: "gpt-4o-mini",
        temperature: 1.0,
        response_format: zodResponseFormat(quizSchema(numQuestions), "quiz_response")
      });
      
      const raw = response.choices[0].message.content;
      if (raw == null){
        throw new Error("Response returned null");
      }
      const quiz = JSON.parse(raw); 
      console.log("Quiz generated successfully:", quiz);
      return quiz;
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed:`, error);
    }
  // }
};
