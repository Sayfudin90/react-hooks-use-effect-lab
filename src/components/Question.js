import React, { useState, useEffect } from 'react';

const Question = ({ question, onAnswered }) => {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 1) {
          onAnswered(false); 
          return 10; 
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearTimeout(timerId); 
  }, [timeRemaining, onAnswered]); 

  return (
    <div>
      <h2>{question.prompt}</h2>
      <p>{timeRemaining} seconds remaining</p> {}
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
