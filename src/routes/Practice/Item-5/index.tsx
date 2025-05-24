import { Button } from 'antd';
import styles from './index.module.css';
import { useState } from 'react';

function Item5() {
  const [boxData, setBoxData] = useState({
    backgroundChanged: false,
    sizeChanged: false,
    invisible: false,
  });

  const onDataChange = (value: string) => {
    setBoxData({
      ...boxData,
      [value]: !boxData[value],
    });
  };

  return (
    <div className={styles['container']}>
      <div>
        <Button onClick={() => onDataChange('backgroundChanged')}>
          Change the box background to{' '}
          {boxData.backgroundChanged ? 'grey' : 'red'}
        </Button>
        <Button onClick={() => onDataChange('sizeChanged')}>
          Make the box become {boxData.sizeChanged ? 'smaller' : 'bigger'}{' '}
        </Button>
        <Button onClick={() => onDataChange('invisible')}>
          {boxData.invisible ? 'Show' : 'Hide'} the box
        </Button>
      </div>
      <div
        className={`${styles.box} ${boxData.backgroundChanged && styles.red} ${
          boxData.sizeChanged && styles.bigger
        } ${boxData.invisible && styles.hide}`}
      ></div>
    </div>
  );
}

export default Item5;
