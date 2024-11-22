import React, { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";

function Carousel({ quizData }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answersState, setAnswersState] = useState(
    quizData.quiz.map(() => ({ answerIndex: null, isAnswered: false }))
  );

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>{
      return prevIndex === 0 ? quizData.numQuestions - 1 : prevIndex - 1}
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>{
      return prevIndex === quizData.numQuestions - 1 ? 0 : prevIndex + 1}
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

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div style={styles.container}>
      <div>
        <img style={styles.refresh} src="/refresh.png" alt="Refresh"  onClick={refreshPage} />
      </div>
      <div style={styles.carouselContainer}>
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
    overflow: "hidden"
  },
  carouselContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    maxWidth: "40em",
    margin: "0 auto",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
  },
  arrowButton: {
    border: "none",
    borderRadius: "100%",
    width: "4em",
    height: "4em",
    fontSize: "1em",
    cursor: "pointer",
  },
  content: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: "18px",
  },
};

export default Carousel;
