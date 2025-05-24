import { useState } from 'react';
import QuizSelector from './components/QuizSelector';
import styles from './index.module.css';
import QuizDisplay from './components/QuizDisplay';
import { QuizNavigation } from './components/QuizNavigation';
import QuizTimer from './components/QuizTimer';

const quizes = [
  {
    title: 'Australian History Quiz',
    items: [
      {
        question: 'When did the First Fleet arrive in Australia?',
        answers: [
          { text: '1770', correct: false },
          { text: '1788', correct: true },
          { text: '1800', correct: false },
          { text: '1820', correct: false },
        ],
      },
      {
        question: 'Who was the first European to map the coast of Australia?',
        answers: [
          { text: 'Captain James Cook', correct: true },
          { text: 'William Dampier', correct: false },
          { text: 'Abel Tasman', correct: false },
          { text: 'Matthew Flinders', correct: false },
        ],
      },
      {
        question: 'What year did Australia become a federation?',
        answers: [
          { text: '1890', correct: false },
          { text: '1901', correct: true },
          { text: '1910', correct: false },
          { text: '1920', correct: false },
        ],
      },
      {
        question: 'Who was the first Prime Minister of Australia?',
        answers: [
          { text: 'Edmund Barton', correct: true },
          { text: 'Alfred Deakin', correct: false },
          { text: 'George Reid', correct: false },
          { text: 'John Curtin', correct: false },
        ],
      },
      {
        question: 'What event is celebrated on January 26th in Australia?',
        answers: [
          { text: 'Anzac Day', correct: false },
          { text: 'Australia Day', correct: true },
          { text: 'Labour Day', correct: false },
          { text: 'Melbourne Cup', correct: false },
        ],
      },
    ],
  },
  {
    title: 'Electric Cars Quiz',
    items: [
      {
        question:
          'What is the main advantage of electric cars over traditional gasoline cars?',
        answers: [
          { text: 'Higher top speed', correct: false },
          { text: 'Lower running costs and zero emissions', correct: true },
          { text: 'More fuel options', correct: false },
          { text: 'Cheaper manufacturing', correct: false },
        ],
      },
      {
        question:
          'Which company is known for popularizing electric cars with its Model S?',
        answers: [
          { text: 'Nissan', correct: false },
          { text: 'Chevrolet', correct: false },
          { text: 'Tesla', correct: true },
          { text: 'Ford', correct: false },
        ],
      },
      {
        question:
          'What is the term for the device used to store electrical energy in electric cars?',
        answers: [
          { text: 'Fuel tank', correct: false },
          { text: 'Battery', correct: true },
          { text: 'Combustion chamber', correct: false },
          { text: 'Generator', correct: false },
        ],
      },
      {
        question:
          'Which electric car model is known for being one of the best-selling electric vehicles of all time?',
        answers: [
          { text: 'Tesla Model 3', correct: true },
          { text: 'Nissan Leaf', correct: false },
          { text: 'Chevrolet Bolt', correct: false },
          { text: 'BMW i3', correct: false },
        ],
      },
      {
        question: 'What is regenerative braking in electric cars?',
        answers: [
          {
            text: "A system that uses the car's engine to slow down",
            correct: false,
          },
          {
            text: 'A system that recharges the battery while braking',
            correct: true,
          },
          { text: 'A method to increase top speed', correct: false },
          { text: 'A feature to improve fuel efficiency', correct: false },
        ],
      },
    ],
  },
  {
    title: 'Javascript Quiz',
    items: [
      {
        question: 'What does HTML stand for?',
        answers: [
          { text: 'Hyper Text Markup Language', correct: true },
          { text: 'High Text Markup Language', correct: false },
          { text: 'Hyper Tabular Markup Language', correct: false },
          { text: 'None of these', correct: false },
        ],
      },
      {
        question: 'Which language runs in a web browser?',
        answers: [
          { text: 'Java', correct: false },
          { text: 'C', correct: false },
          { text: 'Python', correct: false },
          { text: 'JavaScript', correct: true },
        ],
      },
      {
        question: 'What does CSS stand for?',
        answers: [
          { text: 'Central Style Sheets', correct: false },
          { text: 'Cascading Style Sheets', correct: true },
          { text: 'Cascading Simple Sheets', correct: false },
          { text: 'Cars SUVs Sailboats', correct: false },
        ],
      },
      {
        question: 'What year was JavaScript launched?',
        answers: [
          { text: '1996', correct: false },
          { text: '1995', correct: true },
          { text: '1994', correct: false },
          { text: 'none of the above', correct: false },
        ],
      },
      {
        question: 'Which tool can you use to ensure code quality?',
        answers: [
          { text: 'Angular', correct: false },
          { text: 'jQuery', correct: false },
          { text: 'RequireJS', correct: false },
          { text: 'ESLint', correct: true },
        ],
      },
    ],
  },
];

export default function Item30Learning() {
  const [selectedQuizIndex, setSelectedQuizIndex] = useState(-1);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<number>>([]);
  const [showResults, setShowResults] = useState(false);

  const onQuizSelectorChanged = (value: number) => {
    setSelectedQuizIndex(value);

    // use array map to create an the new array for answers that will have the same number of items like the selected quiz items
    // the value of each item in this case will be { state: 'unattempted' }
    setAnswers(
      quizes[value].items.map(() => {
        return -1;
      })
    );
  };

  const onQuizNavigationChanged = (value: number) => {
    setSelectedItemIndex(value - 1);
  };
  const onAnswerSelected = (answerIndex: number) => {
    const selectedQuiz = quizes[selectedQuizIndex];
    const selectedItem = selectedQuiz.items[selectedItemIndex];

    answers[selectedItemIndex] = answerIndex;

    setAnswers([...answers]);
  };
  console.log(answers);
  const onFinishButtonClick = () => {
    setShowResults(true);
  };

  return (
    <div className={styles.container}>
      {selectedQuizIndex < 0 && (
        <QuizSelector
          selectedIndex={selectedQuizIndex}
          onChange={onQuizSelectorChanged}
          quizes={quizes}
        />
      )}
      {selectedQuizIndex >= 0 && !showResults && (
        <>
          <QuizDisplay
            selectedIndex={selectedItemIndex}
            quiz={quizes[selectedQuizIndex]}
            onAnswerSelected={onAnswerSelected}
            selectedAnswers={answers}
            showResults={showResults}
          />
          <QuizTimer showResults={showResults} />
          <QuizNavigation
            current={selectedItemIndex + 1}
            total={quizes[selectedQuizIndex].items.length}
            onChange={onQuizNavigationChanged}
            onFinishButtonClick={onFinishButtonClick}
            showResults={showResults}
          />
        </>
      )}

      {selectedQuizIndex >= 0 && showResults && <QuizReport />}
    </div>
  );
}
