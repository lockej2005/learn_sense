import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/quiz.css';


const apiKey = process.env.OPENAI_KEY;

async function sendChatGPTRequest(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        temperature: 1,
        messages: [
          {
            role: 'system',
            content:
              'Write a multiple choice question that presents a unique real-world problem that tests a student’s ability to apply their understanding of this curriculum area given in the prompt, the response must be in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedMessage = response.data.choices[0].message.content;
    return generatedMessage;
  } catch (error) {
    console.error('Error calling ChatGPT API:', error.response.data);
    throw error;
  }
}

function QuizPage() {
  const { subject } = useParams();
  const [quizSections, setQuizSections] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false); // Added submitted state

  useEffect(() => {
    async function fetchQuizText() {
      try {
        const prompt = 'Identify and describe factors and multiples of whole numbers and use them to solve problems';
        let response = await sendChatGPTRequest(prompt);

        // Check if the initial response contains at least 7 "<" and 7 ">" symbols
        const countOpenTags = response.split('<').length - 1;
        const countCloseTags = response.split('>').length - 1;
        const isValidResponse = countOpenTags >= 7 && countCloseTags >= 7;

        // Generate a new response if the initial response is not valid

        console.log(response);
        const sections = response.split('<').map((section) => section.split('>')[0]);
        setQuizSections(sections);
      } catch (error) {
        console.error('Error fetching quiz text:', error);
      }
    }

    fetchQuizText();
  }, []); // Empty dependency array

  // Create individual variables for each section
  const [question, answer1, answer2, answer3, answer4, explanation, letterValue] = quizSections.slice(1, 8);

  const handleOptionSelect = (option) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
    setSubmitted(true); // Set submitted state to true
  };

  const isAnswerCorrect = () => {
    return selectedOption === letterValue;
  };

  const A = "A";
  const B = "B";
  const C = "C";
  const D = "D";
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Welcome to the Weekly quiz for {subject}</h1>
      <div className="quiz-content">
        <p className="quiz-text">{question}</p>
        <p className={`quiz-options ${selectedOption === A ? 'selected' : ''}`} onClick={() => handleOptionSelect(A)}>
          {A} {answer1}
        </p>
        <p className={`quiz-options ${selectedOption === B ? 'selected' : ''}`} onClick={() => handleOptionSelect(B)}>
          {B} {answer2}
        </p>
        <p className={`quiz-options ${selectedOption === C ? 'selected' : ''}`} onClick={() => handleOptionSelect(C)}>
          {C} {answer3}
        </p>
        <p className={`quiz-options ${selectedOption === D ? 'selected' : ''}`} onClick={() => handleOptionSelect(D)}>
          {D} {answer4}
        </p>
        {selectedOption && <p className="selected-option">Selected Option: {selectedOption}</p>}
        {showResult && (
          <p className="quiz-text">
            {isAnswerCorrect() ? 'You are right!' : 'You are wrong!'}
            <br />
            Correct Answer: {letterValue}
            <br />
            Explanation: {explanation}
          </p>
        )}
        <button className="quiz-button" onClick={handleSubmit} disabled={submitted}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
