import React, { useState } from "react";
import { generateQuestions } from "../services/llmServices.js";

function InputForm({ setNumQuestions, setQuestionDatas }) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseInt(inputValue, 10);
    if (isNaN(num) || num <= 0 || num > 50) {
      alert("Please enter a valid number!");
      return;
    }
    setLoading(true); // Start loading
    setNumQuestions(num);
    try {
      const responses = await generateQuestions(num, "a very hard");
      responses.forEach((response, index) => {
        const data = response.message.content.split(`#`);
        const question = data[0];
        const answers = [
          { text: data[1], isCorrect: 1 == data[5] },
          { text: data[2], isCorrect: 2 == data[5] },
          { text: data[3], isCorrect: 3 == data[5] },
          { text: data[4], isCorrect: 4 == data[5] },
        ];
        const questionData = { question, answers, index: index + 1 };
        setQuestionDatas((prevData) => [...prevData, questionData]);
      });
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("There was an error generating the quiz. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "400px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      {loading ? (
        <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>Loading...</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label style={{ fontSize: "1.2em", fontWeight: "bold" }}>
            How many questions would you like?
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "80%",
              fontSize: "1em",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              fontSize: "1em",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          >
            Generate Quiz
          </button>
        </form>
      )}
    </div>
  );
}

export default InputForm;
