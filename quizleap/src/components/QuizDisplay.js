import React from "react";

function QuizDisplay({ questions }) {
  return (
    <div>
      <h1>Your Quiz</h1>
      {questions.map((question, index) => (
        <div key={index}>
          <h2>Question {index + 1}</h2>
          <p>{question}</p>
        </div>
      ))}
    </div>
  );
}

export default QuizDisplay;
