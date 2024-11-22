import React from "react";

function MultipleChoiceQuestion({ question, answers, index, answerState, onAnswer }) {
  const { answerIndex, isAnswered } = answerState;

  const handleAnswerClick = (index, isCorrect) => {
    if (!isAnswered) {
      onAnswer(index);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "400px", margin: "auto" }}>
      <h1>Question {index}</h1>
      <h2>{question}</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {answers.map((answer, idx) => (
          <li
            key={idx}
            onClick={() => handleAnswerClick(idx, answer.isCorrect)}
            style={{
              cursor: "pointer",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "center",
              backgroundColor: isAnswered
                ? answerIndex === idx
                  ? answer.isCorrect
                    ? "lightgreen"
                    : "lightcoral"
                  : "white"
                : "white",
              border: "1px solid #ccc",
              transition: "background-color 0.3s",
            }}
          >
            {answer.option}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MultipleChoiceQuestion;
