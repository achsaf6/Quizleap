import React from "react";

/**
 * MultipleChoiceQuestion component to display a single multiple-choice question.
 * Handles the display of question text, answers, and user interaction for answering.
 */
function MultipleChoiceQuestion({ question, answers, index, answerState, onAnswer }) {
  const { answerIndex, isAnswered } = answerState;

  /**
   * Handles clicks on an answer. Only triggers if the question is not already answered.
   * @param {number} index - The index of the clicked answer.
   */
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
            onClick={() => handleAnswerClick(idx)}
            style={styles.answerItem(isAnswered, answerIndex, idx, answer.isCorrect)}
          >
            {answer.option}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Inline styles for the MultipleChoiceQuestion component
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "auto",
  },
  questionHeader: {
    marginBottom: "10px",
    fontSize: "1.5em",
    fontWeight: "bold",
    textAlign: "center",
  },
  questionText: {
    marginBottom: "20px",
    fontSize: "1.2em",
    textAlign: "center",
  },
  answerList: {
    listStyle: "none",
    padding: 0,
  },
  /**
   * Dynamically styles each answer item based on whether the question is answered
   * and if the selected answer is correct or incorrect.
   * @param {boolean} isAnswered - Whether the question has been answered.
   * @param {number} answerIndex - The index of the selected answer.
   * @param {number} idx - The index of the current answer.
   * @param {boolean} isCorrect - Whether the current answer is correct.
   */
  answerItem: (isAnswered, answerIndex, idx, isCorrect) => ({
    cursor: "pointer",
    margin: "10px 0",
    padding: "10px",
    borderRadius: "5em",
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
    fontSize: "1em",
  }),
};

export default MultipleChoiceQuestion;
