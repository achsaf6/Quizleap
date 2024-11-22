import React, { useState, useEffect } from "react";
import { generateQuestions } from "../services/llmServices.ts";

function InputForm({ setNumQuestions, setQuizData }) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstKeyPressed, setFirstKeyPressed] = useState(false);

  const handleSubmit = async (num) => {
    if (isNaN(num) || num <= 0 || num > 50) {
      const cry = String.fromCodePoint(128557);
      alert(`I can only generate 1-50 questions at a time ${cry}`);
      return;
    }
    console.log(`Generating ${num} questions...`);
    setLoading(true); // Start loading
    setNumQuestions(num);
    const response = await generateQuestions(num, "a very hard");
    console.log(`Quiz generated successfully:`, response);
    setQuizData(response);
    setLoading(false); // Stop loading
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

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [firstKeyPressed]); // Dependency includes `firstKeyPressed`

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
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(parseInt(inputValue, 10));
          }}
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
