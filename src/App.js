import './App.css';
import React, {useState} from 'react';
import InputForm from "./components/InputForm";
import Carousel from './components/Carousel';
import Sidebar from './components/Sidebar';

function App() {
  const [topic, setTopic] = useState("Harry Potter");
  const [difficulty, setDifficulty] = useState(3);
  const [quizData, setQuizData] = useState(null);

  const metaData = {topic : topic, difficulty : difficulty};


  return (
    <body className="App" >
      <div className='content'>
        <Sidebar setTopic={setTopic} difficulty={difficulty} setDifficulty={setDifficulty}/>
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
