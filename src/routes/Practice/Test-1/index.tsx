import Title from 'antd/es/typography/Title';
import styles from './index.module.css';
import { Button } from 'antd';
import { useState } from 'react';

function Test1() {
  const [randomNumber, setRandomNumber] = useState<number>();
  const [playerChoice, setPlayerChoice] = useState([0, 0]);

  const onButtonClick = (min: number, max: number) => {
    setRandomNumber(Math.round(Math.random() * 30));
    setPlayerChoice([min, max]);
  };

  return (
    <div className={styles.container}>
      <Title>Guess the number</Title>
      <div>
        Pick your number range. If the robot randomly picks a number within the
        range you pick, you WIN!
      </div>
      <div>
        {randomNumber &&
          `Player Picks: ${playerChoice[0]} - ${playerChoice[1]} computer picks ${randomNumber}`}
        <div>
          You
          {randomNumber >= playerChoice[0] && randomNumber <= playerChoice[1]
            ? ' Win'
            : ' Lost'}
        </div>
      </div>
      <div className={styles['button-container']}>
        <Button onClick={() => onButtonClick(0, 10)}>0-10</Button>
        <Button onClick={() => onButtonClick(11, 20)}>11-20</Button>
        <Button onClick={() => onButtonClick(21, 30)}>21-30</Button>
      </div>
    </div>
  );
}

export default Test1;
