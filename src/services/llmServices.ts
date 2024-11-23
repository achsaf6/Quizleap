import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const API_KEY = process.env.REACT_APP_API_KEY;

// Initialize OpenAI client with API key
const client = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true, // Enables OpenAI usage directly in browser (use cautiously)
});

/**
 * Schema for validating quiz response structure using Zod.
 * Ensures quiz contains the specified number of questions.
 * @param {number} numQuestions - The expected number of quiz questions.
 * @returns {z.Schema} Zod schema for quiz validation.
 */
const quizSchema = (numQuestions) =>
  z.object({
    quiz: z.array(
      z.object({
        question: z.string(),
        answers: z.array(
          z.object({
            option: z.string(),
            isCorrect: z.boolean(),
          })
        ),
      })
    ),
    numQuestions: z.number().refine((val) => val === numQuestions, {
      message: `numQuestions must be ${numQuestions}`,
    }),
  });

// List of potential Harry Potter topics
const topics = [
  "Characters",
  "Hogwarts",
  "Creatures",
  "Magical Objects",
  "Locations",
  "Spells",
  "Potions",
  "Ingredients",
  "History",
  "Magic",
  "Events",
  "Spin-offs",
];

// Description of the AI's role in generating quiz questions
const systemRole = `You are a massive Harry Potter fan who is deeply invested in the wizarding world.
You are writing a fun multiple-choice quiz for a local trivia night.`;

/**
 * Generates a random prompt for quiz generation.
 * Randomly selects topics and formats the prompt template.
 * @param {number} numQuestions - Number of questions in the quiz.
 * @param {string} difficulty - Difficulty level of the quiz.
 * @returns {string} A formatted prompt for quiz generation.
 */
const getRandomPrompt = (numQuestions, difficulty) => {
  const topic = [...topics]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.floor(topics.length/2)-1)
    .join();

  const templates = [
    `Create a multiple-choice quiz containing ${numQuestions} questions at a ${difficulty} difficulty level. Ensure that all questions are semantically distinct and are about ${topic}.`,
    `Generate a ${difficulty}-level multiple-choice quiz with ${numQuestions} questions. Each question should be unique in meaning and are about ${topic}.`,
    `Produce a multiple-choice quiz featuring ${numQuestions} questions, tailored to a ${difficulty} difficulty level. Make sure all questions are semantically different and are about ${topic}.`,
    `Construct a multiple-choice quiz with ${numQuestions} questions of ${difficulty} difficulty, ensuring semantic uniqueness for every question and are about ${topic}.`,
    `Design a ${difficulty}-difficulty multiple-choice quiz comprising ${numQuestions} questions and are about ${topic}.`,
  ];

  return templates[Math.floor(Math.random() * templates.length)];
};

/**
 * Generates a Harry Potter-themed quiz using OpenAI's GPT model.
 * Automatically retries on errors and makes recursive calls for incomplete quizzes.
 * @param {number} numQuestions - The total number of questions to generate.
 * @param {string} difficulty - The difficulty level of the quiz.
 * @returns {Promise<Object>} The generated quiz JSON object.
 */
export const generateQuestions = async (numQuestions, difficulty) => {
  if (numQuestions < 1) return { quiz: [] }; // Base case for recursion

  const prompt = `${getRandomPrompt(numQuestions, difficulty)} Each question should cover a deep niche in Harry Potter lore.`;

  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemRole },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o",
      temperature: 0.8,
      response_format: zodResponseFormat(quizSchema(numQuestions), "quiz_response"),
    });

    const raw = response.choices[0]?.message?.content;
    if (!raw) throw new Error("Response returned null");

    const quizJSON = JSON.parse(raw);

    // Check if the generated quiz contains fewer questions than requested
    if (quizJSON.quiz.length < numQuestions) {
      console.log(`Making additional call for ${numQuestions - quizJSON.quiz.length} questions.`);
      const secondCall = await generateQuestions(numQuestions - quizJSON.quiz.length, difficulty);
      quizJSON.quiz.push(...secondCall.quiz);
    }

    return quizJSON;

  } catch (error) {
    console.error("Quiz generation failed:", error);

    // Retry on failure
    return generateQuestions(numQuestions, difficulty);
  }
};
