import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import Carousel from './components/Carousel';

function App() {
  const [numQuestions, setNumQuestions] = useState(0);
  const [questionDatas, setQuestionDatas] = useState([]);

  return (
    
    <body className="App">
      {!questionDatas.length ? (
        <InputForm setNumQuestions={setNumQuestions} setQuestionDatas={setQuestionDatas} />
      ) : (
        <Carousel questions={questionDatas}/>
      )}
    </body>
    
  );
}

export default App;
