import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import Carousel from './components/Carousel';

function App() {
  const [numQuestions, setNumQuestions] = useState(0);
  const [quizData, setQuizData] = useState(null);

  return (
    
    <body className="App" >
      <div className='content'>
        {!quizData ? (
          <InputForm setNumQuestions={setNumQuestions} setQuizData={setQuizData} />
        ) : (
          <Carousel quizData={quizData}/>
        )}
      </div>
    </body>
    
  );
}

export default App;
