import React, { useState, useEffect } from "react";
import { generateQuestions } from "../services/llmServices.ts";
import "./animations.css"


const difficultyMap = {
  1: "Very Easy",
  2: "Easy",
  3: "Medium",
  4: "Hard",
  5: "Impossible"
};

const shuffleAnswers = (response) => {
  response.quiz.forEach((quizItem) => {
    quizItem.answers.sort(() => Math.random() - 0.5);
  });
  return response; 
};


function InputForm({ setQuizData, metaData }) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (num) => {
    if (isNaN(num) || num <= 0 || num > 50) {
      const cry = String.fromCodePoint(128557);
      alert(`I can only generate 1-50 questions at a time ${cry}`);
      return;
    }
    console.log(`Generating ${num} questions about Harry Potter of difficulty ${metaData.difficulty}...`);
    setLoading(true);
    let response = await generateQuestions(num, difficultyMap[metaData.difficulty]);
    response = shuffleAnswers(response);
    console.log(`Quiz generated successfully:`, response);
    setQuizData(response);
    setLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (document.activeElement.tagName !== "INPUT") {
        const key = event.key;
        if (!isNaN(key) && key !== " ") {
          let num = parseInt(key, 10);
          if (num === 0) num = 50;
          handleSubmit(num);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div style={styles.container}>
      {loading ? (
        <img src="/loading.png" alt="Loading..." style={styles.loading}/>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(parseInt(inputValue, 10));
          }}
          style={styles.form}
        >
          <label style={styles.label}>How many questions would you like?</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ae0001")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#740001")}
          >
            Generate Quiz
          </button>
        </form>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "auto",
    textAlign: "center",
  },
  loading: {
    fontSize: "10em",
    width: "0.8em",
    fontWeight: "bold",
    animation: "rotate 7s linear infinite",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9da71",
  },
  label: {
    fontSize: "1.2em",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    width: "80%",
    fontSize: "1em",
    textAlign: "center",
    WebkitAppearance: 'none',
    MozAppearance: 'textfield',
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#740001",
    color: "white",
    cursor: "pointer",
    fontSize: "1em",
    transition: "background-color 0.3s",
  },
};

export default InputForm;
