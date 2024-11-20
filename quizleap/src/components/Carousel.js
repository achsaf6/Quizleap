import React, { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

function Carousel({ questions }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersState, setAnswersState] = useState(
    questions.map(() => ({ answerIndex: null, isAnswered: false }))
  );

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? questions.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === questions.length - 1 ? 0 : prevIndex + 1
    );
  };

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

  return (
    <div style={styles.carouselContainer}>
      <button onClick={goToPrevious} style={styles.arrowButton}>
        &lt;
      </button>
      <div style={styles.content}>
        <MultipleChoiceQuestion
          question={questions[currentIndex].question}
          answers={questions[currentIndex].answers}
          index={currentIndex + 1}
          answerState={answersState[currentIndex]}
          onAnswer={(answerIndex) => handleAnswer(currentIndex, answerIndex)}
        />
      </div>
      <button onClick={goToNext} style={styles.arrowButton}>
        &gt;
      </button>
    </div>
  );
}

const styles = {
  carouselContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    maxWidth: "400px",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  arrowButton: {
    backgroundColor: "#f0f0f0",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    fontSize: "20px",
    cursor: "pointer",
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "18px",
  },
};

export default Carousel;
