// import axios from "axios";

const API_URL = "https://api.openai.com/v1/completions"; // Example for OpenAI API
const API_KEY = "your-api-key"; // Replace with your actual API key

export const generateQuestions = async (numQuestions) => {
    return "How many fingers am I holding up?\nWhat time is it?\nWould you like fries with that".split("\n");
};
// export const generateQuestions = async (numQuestions) => {
//   try {
//     const response = await axios.post(
//       API_URL,
//       {
//         model: "text-davinci-003", // Adjust according to your model
//         prompt: `Generate ${numQuestions} multiple-choice questions on general knowledge.`,
//         max_tokens: 1000,
//         n: 1,
//         stop: null,
//       },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       }
//     );
//     // Parse and return the questions
//     const questions = response.data.choices[0].text.split("\n").filter(Boolean);
//     return questions;
//   } catch (error) {
//     console.error("Error generating questions:", error);
//     return ["Error generating questions, please try again."];
//   }
// };
