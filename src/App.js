import './App.css';
import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import Carousel from './components/Carousel';
import Sidebar from './components/Sidebar';

function App() {
  const [difficulty, setDifficulty] = useState(2);
  const [quizData, setQuizData] = useState(null);

  const metaData = {difficulty : difficulty};


  return (
    <body className="App" >
      <div className='content'>
        <Sidebar difficulty={difficulty} setDifficulty={setDifficulty}/>
        {!quizData ? (
          <InputForm setQuizData={setQuizData} metaData={metaData}/>
        ) : (
          <Carousel quizData={quizData}/>
        )}
      </div>
    </body>
    
  );
}

export default App;
