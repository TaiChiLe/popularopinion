import { useState } from 'react';
import styles from './index.module.css';

function Item20() {
  const [counter, setCounter] = useState(0);
  const min = -10;
  const max = 10;

  const onButtonClick = (add: boolean) => {
    if (add && counter < max) {
      setCounter(counter + 1);
    } else if (!add && counter > min) {
      setCounter(counter - 1);
    }
  };

  return (
    <div className={styles.container}>
      <div>{counter}</div>
      <div className={styles['buttons-container']}>
        <div className={styles.button} onClick={() => onButtonClick(false)}>
          -
        </div>
        <div className={styles.button} onClick={() => onButtonClick(true)}>
          +
        </div>
      </div>
      <div>
        <div>Min: {min}</div>
        <div>Max: {min}</div>
      </div>
    </div>
  );
}

export default Item20;
