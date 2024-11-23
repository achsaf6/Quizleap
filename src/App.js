import './App.css';
import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Carousel from './components/Carousel';
import Sidebar from './components/Sidebar';

/**
 * Main application component for the quiz app.
 * It manages the state and layout of the application, switching between the input form
 * and the quiz display (carousel).
 */
function App() {

  const [difficulty, setDifficulty] = useState(3);

  // State to store quiz, initially set to null
  const [quizData, setQuizData] = useState(null);

  // Metadata for future extensions (e.g., subjects, preferences)
  const metaData = { difficulty: difficulty };

  return (
    <body className="App">
      <div className="content">
        {/* If no quiz data is present, display the sidebar and input form */}
        {!quizData ? (
          <div>
            <Sidebar difficulty={difficulty} setDifficulty={setDifficulty} />
            <InputForm setQuizData={setQuizData} metaData={metaData} />
          </div>
        ) : (
          // If quiz data is available, display the quiz carousel
          <Carousel quizData={quizData} />
        )}
      </div>
    </body>
  );
}

export default App;
