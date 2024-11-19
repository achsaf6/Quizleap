import React, { useState } from "react";
import "./InputForm.css"
import { generateQuestions } from "../services/llmServices.js";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion.js";
// multiple choice questions
// free form questions

function InputForm({ setNumQuestions, questions, setQuestions }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || num <= 0) {
      alert("Please enter a valid number!");
      return;
    }
    setNumQuestions(num);
    const responses = await generateQuestions(num, "a very hard");
    responses.forEach( (response, index) => {
      const data = response.message.content.split(`#`);
      const question = data[0];
      const answers = [
        {text: data[1], isCorrect: 1 == data[5]},
        {text: data[2], isCorrect: 2 == data[5]},
        {text: data[3], isCorrect: 3 == data[5]},
        {text: data[4], isCorrect: 4 == data[5]},
      ]
      const questionComponent = <MultipleChoiceQuestion question={question} answers={answers} index={index+1}/>;
      setQuestions((prevQuestions) => [...prevQuestions,questionComponent]);
    } )
  };

  return (
<form onSubmit={handleSubmit} className="form-container">
  <label className="form-label">
    How many questions do you want?
  </label>
  <input
    type="number"
    value={inputValue}
    onChange={(e) => setInputValue(e.target.value)}
    className="form-input"
  />
  <button type="submit" className="form-button">Generate Quiz</button>
</form>

  );
}

export default InputForm;
