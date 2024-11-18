import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import QuizDisplay from "./components/QuizDisplay";

function App() {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  return (
    
    <body className="App">
      {!questions.length ? (
        <InputForm setNumQuestions={setNumQuestions} setQuestions={setQuestions} />
      ) : (
        <QuizDisplay questions={questions} />
      )}
    </body>
  );
}

export default App;
