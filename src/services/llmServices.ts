import OpenAI from "openai";
import {z} from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { stringify } from "openai/internal/qs/stringify.mjs";
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
  numQuestions: z.number().refine((val) => val === numQuestions, {
    message: `numQuestions must be ${numQuestions}`,
  }),
})

const systemRole = `You are a massive Harry Potter nerd who is deeply involved in the wizarding world.
                        You are writing a fun mutiple choice trivia questions that cover a range of topics 
                        in the harry potter universe.
                    `

const client = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true, 
});




export const generateQuestions = async (topic = "Harry Potter", numQuestions = 5, difficulty = `medium`) => {
    if (numQuestions < 1) return {quiz:[]};

    const answerIndex = Array.from({ length: numQuestions }, () => Math.floor(Math.random() * 4) 
    );

    const prompt = `Generate a multiple choice quiz that has ${numQuestions} questions of ${difficulty} difficulty.
                  Ensure that each question is semantically unique, and the answer index of each questions is ${stringify(answerIndex)}.
                  
                  Include questions base off the books, movies, and other canon
                        sources to cover as many different topics as possible. Use the following steps to guide
                        your questions generation:
                        
                        1. Choose a random topic from the Harry Potter series (ie. event, character, place, etc)
                        2. Generate a random question around the topic
                        3. In any order generate several incorrect answers and one correct answer `;

      try {
        const response = await client.chat.completions.create({
          messages: [
            {
              role: `system`,
              content: systemRole,
            },
            { role: `user`, content: prompt },
          ],
          model: `gpt-4o-mini`,
          temperature: 1.2,
          response_format: zodResponseFormat(quizSchema(numQuestions), `quiz_response`)
        });
        
        const raw = response.choices[0].message.content;
        if (raw == null){
          throw new Error(`Response returned null`);
        }
        const quizJSON = JSON.parse(raw); 
        if (quizJSON.quiz.length < numQuestions) {
          console.log(`Second Call was made with ${numQuestions - quizJSON.quiz.length} `);
          const secondCall = await  generateQuestions(topic, numQuestions - quizJSON.quiz.length, difficulty);
          quizJSON.quiz.push(...secondCall.quiz)
        }
        return quizJSON;
      } catch (error) {
        console.error(`Quiz generation failed:`, error);
        return generateQuestions(topic, numQuestions, difficulty);
      }
};