import { Select } from 'antd';
import styles from './QuizApp.module.css';
import { useQuizApp } from './QuizApp';

export function Selector() {
  const { quizService } = useQuizApp();
  const handleChange = (value: string) => {
    quizService.setQuiz(value);
  };

  return (
    <Select
      className={styles.container}
      defaultValue="disabled"
      style={{ width: 200 }}
      onChange={handleChange}
      options={[
        { value: 'disabled', label: '-- Select Quiz --', disabled: true },
        { value: 'javascript', label: 'Javascript Quiz' },
        { value: 'history', label: 'Autralian History Quiz' },
        { value: 'cars', label: 'Electric Car Quiz' },
      ]}
    />
  );
}

export function QuizQuestion() {
  const { quizService } = useQuizApp();
  const questions = quizService.getQuizPage();

  return questions;
}
export default function QuizAppUI() {
  return (
    <>
      <Selector />
      <QuizQuestion />
    </>
  );
}
