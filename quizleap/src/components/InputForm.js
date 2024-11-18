import React, { useState } from "react";
import "./InputForm.css"
import { generateQuestions } from "../services/llmServices.js";

// multiple choice questions
// free form questions

function InputForm({ setNumQuestions, setQuestions }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || num <= 0) {
      alert("Please enter a valid number!");
      return;
    }
    setNumQuestions(num);
    const generatedQuestions = await generateQuestions(num);
    setQuestions(generatedQuestions);
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
