import QuizAppUI from './QuizAppUI';
import styles from './QuizApp.module.css';
import { QuizService } from '../QuizService';
import { createContext, useContext } from 'react';

type ContextValue = {
  quizService: QuizService;
};

const QuizServiceContext = createContext<ContextValue | undefined>(undefined);

export function useQuizApp(): ContextValue {
  const context = useContext(QuizServiceContext);

  return context!;
}

export default function QuizApp() {
  const quizService = new QuizService();
  return (
    <div className={styles.container}>
      <QuizServiceContext.Provider value={{ quizService }}>
        <QuizAppUI />
      </QuizServiceContext.Provider>
    </div>
  );
}
