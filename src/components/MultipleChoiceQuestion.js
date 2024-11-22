import React from "react";


function MultipleChoiceQuestion({ question, answers, index, answerState, onAnswer }) {
  const { answerIndex, isAnswered } = answerState;

  const handleAnswerClick = (index) => {
    if (!isAnswered) {
      onAnswer(index);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.questionHeader}>Question {index}</h1>
      <h2 style={styles.questionText}>{question}</h2>
      <ul style={styles.answerList}>
        {answers.map((answer, idx) => (
          <li
            key={idx}
            onClick={() => handleAnswerClick(idx, answer.isCorrect)}
            style={styles.answerItem(isAnswered, answerIndex, idx, answer.isCorrect)}
          >
            {answer.option}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "auto",
  },
  questionHeader: {
    marginBottom: "10px",
  },
  questionText: {
    marginBottom: "20px",
  },
  answerList: {
    listStyle: "none",
    padding: 0,
  },
  answerItem: (isAnswered, answerIndex, idx, isCorrect) => ({
    cursor: "pointer",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5px",
    textAlign: "center",
    backgroundColor: isAnswered
      ? answerIndex === idx
        ? isCorrect
          ? "lightgreen"
          : "lightcoral"
        : "white"
      : "white",
    border: "1px solid #ccc",
    transition: "background-color 0.3s",
  }),
};

export default MultipleChoiceQuestion;
