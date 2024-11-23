import OpenAI from "openai";
import {z} from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const API_KEY = process.env.REACT_APP_API_KEY;

const client = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true, 
});

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

const topics = ['Characters', 'Hogwarts', 'Creatures', 'Magical Objects', 'Locations', 'Spells', 'Potions', 'Ingredients', 'History', 'Magic']

const systemRole = `You are a massive Harry Potter fan who is deeply invested in the wizarding world.
                        You are writing a fun mutiple choice trivia quiz that covers a the topics events, characters, places, spells, items
                        in the harry potter universe.
                    `
const getRandomPrompt = (numQuestions, difficulty) => {

  const answerIndex = Array.from({ length: numQuestions }, () => Math.floor(Math.random() * 4));
  const topic = [...topics].sort(() => 0.5 - Math.random()).slice(4).join();

  const templates = [
      `Create a multiple-choice quiz containing ${numQuestions} questions at a ${difficulty} difficulty level. Ensure that all questions are semantically distinct and are about ${topic}.`,
      `Generate a ${difficulty}-level multiple-choice quiz with ${numQuestions} questions. Each question should be unique in meaning and are about ${topic}.`,
      `Produce a multiple-choice quiz featuring ${numQuestions} questions, tailored to a ${difficulty} difficulty level. Make sure all questions are semantically different and are about ${topic}.`,
      `Construct a multiple-choice quiz with ${numQuestions} questions of ${difficulty} difficulty, ensuring semantic uniqueness for every question and are about ${topic}.`,
      `Design a ${difficulty}-difficulty multiple-choice quiz comprising ${numQuestions} questions and are about ${topic}.`
  ];
  return templates[Math.floor(Math.random() * templates.length)];
}


export const generateQuestions = async (numQuestions = 5, difficulty = `medium`) => {
    if (numQuestions < 1) return {quiz:[]};

    const prompt = `${getRandomPrompt(numQuestions, difficulty)}
                    Each question should cover a niche in Harry Potter lore.
    `
      try {
        const response = await client.chat.completions.create({
          messages: [
            {
              role: `system`,
              content: systemRole,
            },
            { role: `user`, content: prompt },
          ],
          model: `gpt-4o`,
          temperature: 0.8,
          response_format: zodResponseFormat(quizSchema(numQuestions), `quiz_response`)
        });
        
        const raw = response.choices[0].message.content;
        if (raw == null){
          throw new Error(`Response returned null`);
        }
        const quizJSON = JSON.parse(raw); 
        if (quizJSON.quiz.length < numQuestions) {
          console.log(`Second Call was made with ${numQuestions - quizJSON.quiz.length} `);
          const secondCall = await  generateQuestions(numQuestions - quizJSON.quiz.length, difficulty);
          quizJSON.quiz.push(...secondCall.quiz)
        }
        return quizJSON;
      } catch (error) {
        console.error(`Quiz generation failed:`, error);
        return generateQuestions(numQuestions, difficulty);
      }
};