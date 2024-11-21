
import OpenAI from "openai"; 


const API_KEY = process.env.REACT_APP_API_KEY;

const client = new OpenAI({
    apiKey: API_KEY, 
    // dangerouslyAllowBrowser: true //TODO change this 
  });

//TODO check answers
  
  export const generateQuestions = async (numQuestions, difficulty) => {
  const message = `Give me ${difficulty} multiple choice question about the Harry Potter series in the following format:
  #(question goes here)#(option 1)#(option 2)#(option 3)#(option 4)#(answer index)\n\n
  Here is an example of the desired format:\n
  What shape is the scar on Harry's forehead?#Cloud#Feather#Skull#Lightning Bolt#4`
    const response = await client.chat.completions.create({
        messages: [{role: 'system', content: 'You are a Harry Potter expert and trying to write a fun quiz.'},
          { role: 'user', content: message }
        ],
        model: 'gpt-3.5-turbo',
        n: numQuestions,
        temperature: 1.1
      });
      // console.log(response);
      return response.choices;
}
