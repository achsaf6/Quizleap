import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import Carousel from './components/Carousel';

function App() {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questions, setQuestions] = useState([]);

  return (
    
    <body className="App">
      {console.log("outside:\n", questions)}
      {!questions.length ? (
        <InputForm setNumQuestions={setNumQuestions} setQuestions={setQuestions} />
      ) : (
        <Carousel questions={questions}/>
      )}
    </body>
    
  );
}

export default App;
