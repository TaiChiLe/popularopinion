import { Button, ButtonProps } from 'antd';
import Title from 'antd/es/typography/Title';

type QuizDisplayProps = {
  quiz: any;
  selectedIndex: number;
  onAnswerSelected: (answeIndex: number) => void;
  selectedAnswers: Array<number>;
  showResults: boolean;
};

export default function QuizDisplay(props: QuizDisplayProps) {
  const {
    quiz,
    selectedIndex,
    onAnswerSelected,
    selectedAnswers,
    showResults,
  } = props;
  const { title, items } = quiz;
  const selectedItem = items[selectedIndex];
  const selectedAnswerIndex = selectedAnswers[selectedIndex];
  const hasPickedAnAnswerInThisItem = selectedAnswerIndex > -1;

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < selectedAnswers.length; i++) {
      if (selectedAnswerIndex >= 0) {
        if (selectedItem.answers[selectedAnswerIndex].correct) {
          score = score + 1;
          console.log(score);
        }
      }
    }
    return score;
  };

  return (
    <>
      {!showResults && (
        <>
          <Title>{title}</Title>
          {selectedItem.question}
          {selectedItem.answers.map((answer, index) => {
            const hasPickedThisAnswer = index === selectedAnswerIndex;
            const onButtonClick = () => {
              if (!hasPickedAnAnswerInThisItem) {
                onAnswerSelected(index);
              }
            };
            let color: ButtonProps['color'];

            if (hasPickedAnAnswerInThisItem) {
              if (hasPickedThisAnswer && answer.correct) {
                color = 'green';
              } else {
                if (answer.correct) {
                  color = 'blue';
                } else {
                  color = 'red';
                }
              }
            }

            return (
              <Button
                onClick={onButtonClick}
                color={color}
                variant="filled"
                value={index}
                key={index}
                name="button"
              >
                {answer.text}
              </Button>
            );
          })}
        </>
      )}

      {showResults && (
        <>
          <Title>Results:</Title>
          <div>
            {calculateScore()} / {quiz.items.length}
          </div>
        </>
      )}
    </>
  );
}
