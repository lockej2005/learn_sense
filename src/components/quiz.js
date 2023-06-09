import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/quiz.css';

const apiKey = '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';

async function sendChatGPTRequest(prompt) {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        messages: [
          {
            role: 'system',
            content:
              'You are writing a unique multiple-choice question that presents a real-world problem that will test a student’s ability to apply their understanding of a cirriculum area given in the prompt to solve that problem. The response you give will be filtered through a program that needs to be able to identify the separate sections of the question so it can display it appropriately for the student to understand, answer and see what is the correct answer. Your response should follow this template exactly, nothing in your response should be different to the text after the colon apart from the text inside each respective "<>": 1<Question>A<First Possible Answer>B<Second Possible Answer>C<Third Possible Answer>D<Fourth and final Possible Answer>6<Explanation of which of the above 4 answers was correct>7<Just the letter value of the correct option>. Include the "<" and ">" before and after each section as shown in the template so that my program can filter through you response and seperate each respective section. Make Sure your answer does not differ from this template and only includes the 7 components each as described, each time you generate a response select one of the A, B, C or D options as the correct answer. Each section must have value as the first character followed by a "<" then a ">" as the last character, do not use any other characters because the program only looks the values inside the "<" and ">".'
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
        if (!isValidResponse) {
          response = await sendChatGPTRequest(prompt);
        }

        console.log(response);
        const sections = response.split('<').map((section) => section.split('>')[0]);
        setQuizSections(sections);
      } catch (error) {
        console.error('Error fetching quiz text:', error);
      }
    }

    fetchQuizText();
  }, []);

  // Create individual variables for each section
  const [question, answer1, answer2, answer3, answer4, explanation, letterValue] = quizSections.slice(1, 8);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    setShowResult(true);
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
        <button className="quiz-button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
