import { Button } from 'antd';
import styles from './index.module.css';
import { useState } from 'react';

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'];

function Item6() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextIndex = currentIndex < colors.length - 1 ? currentIndex + 1 : 0;
  const changeBackground = () => {
    setCurrentIndex(nextIndex);
  };

  return (
    <div className={`${styles[colors[currentIndex]]} ${styles.container}`}>
      <Button onClick={changeBackground}>
        To color{' '}
        <span className={styles[colors[nextIndex]]}>{colors[nextIndex]}</span>
      </Button>
    </div>
  );
}

export default Item6;
