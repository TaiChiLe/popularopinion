import { useEffect, useState } from 'react';
import ConvertSecondsToTimer from './ConvertSecondsToTimer';

type QuizTimerProps = {
  showResults: boolean;
};

export default function QuizTimer(props: QuizTimerProps) {
  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer + 1);
    }, 1000);

    if (props.showResults === true) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [props.showResults, timer]);

  return (
    <>
      {!props.showResults && ConvertSecondsToTimer(timer)}
      {props.showResults && (
        <>Completion time: {ConvertSecondsToTimer(timer)}</>
      )}
    </>
  );
}
