import React, { useState } from 'react';

function MultipleChoiceQuestion ({ question, answers, index }) {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswerClick = (index, isCorrect) => {
    if (!isAnswered) {
      setSelectedAnswerIndex(index);
      setIsAnswered(true);
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: 'auto' }}>
      <h1>Question {index}</h1>
      <h2>{question}</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {answers.map((answer, index) => (
          <li
            key={index}
            onClick={() => handleAnswerClick(index, answer.isCorrect)}
            style={{
              cursor: 'pointer',
              margin: '10px 0',
              padding: '10px',
              borderRadius: '5px',
              textAlign: 'center',
              backgroundColor: isAnswered
                ? selectedAnswerIndex === index
                  ? answer.isCorrect
                    ? 'lightgreen'
                    : 'lightcoral'
                  : 'white'
                : 'white',
              border: '1px solid #ccc',
              transition: 'background-color 0.3s',
            }}
          >
            {answer.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MultipleChoiceQuestion;
