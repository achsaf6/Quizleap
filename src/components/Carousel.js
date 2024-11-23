import React, { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

/**
 * Carousel component for displaying a series of multiple-choice questions.
 * Allows navigation between questions and handles user answers.
 */
function Carousel({ quizData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Tracks the state of answers for each question
  const [answersState, setAnswersState] = useState(
    quizData.quiz.map(() => ({ answerIndex: null, isAnswered: false }))
  );

  /**
   * Navigate to the previous question.
   * If the current question is the first, wrap around to the last question.
   */
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quizData.numQuestions - 1 : prevIndex - 1
    );
  };

  /**
   * Navigate to the next question.
   * If the current question is the last, wrap around to the first question.
   */
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === quizData.numQuestions - 1 ? 0 : prevIndex + 1
    );
  };

  /**
   * Handles the user's answer to a question.
   * Updates the answer state for the specified question.
   * @param {number} questionIndex - Index of the question being answered.
   * @param {number} answerIndex - Index of the selected answer.
   */
  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswersState((prevState) => {
      const newState = [...prevState];
      newState[questionIndex] = {
        answerIndex,
        isAnswered: true,
      };
      return newState;
    });
  };

  /**
   * Refreshes the page, effectively restarting the quiz.
   */
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div className="refresh">
        <img
          style={styles.refresh}
          src="/refresh.png"
          alt="Refresh"
          onClick={refreshPage}
        />
      </div>
      <div className="carouselContainer" style={styles.carouselContainer}>
        <button onClick={goToPrevious} style={styles.arrowButton}>
          &lt;
        </button>
        <div style={styles.content}>
          <MultipleChoiceQuestion
            question={quizData.quiz[currentIndex].question}
            answers={quizData.quiz[currentIndex].answers}
            index={currentIndex + 1}
            answerState={answersState[currentIndex]}
            onAnswer={(answerIndex) => handleAnswer(currentIndex, answerIndex)}
          />
        </div>
        <button onClick={goToNext} style={styles.arrowButton}>
          &gt;
        </button>
      </div>
    </div>
  );
}

// Inline styles for the Carousel component
const styles = {
  refresh: {
    margin: "1em auto",
    display: "block",
    boxSizing: "border-box",
    width: "100%",
    maxWidth: "2em",
    height: "auto",
    objectFit: "contain",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  carouselContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    maxWidth: "40em",
    margin: "0 auto",
    borderRadius: "3em",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
    backgroundColor: "#f9da71",
  },
  arrowButton: {
    border: "none",
    width: "1em",
    height: "1em",
    fontSize: "5em",
    cursor: "pointer",
    backgroundColor: "#f9da71",
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "18px",
  },
};

export default Carousel;
