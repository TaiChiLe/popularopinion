import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.module.css';

function Item14() {
  const [boxPosition, setBoxPosition] = useState({
    top: 0,
    left: 0,
  });
  const boxRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const move = (leftOffset: number, topOffset: number) => {
    const boxWidth = boxRef.current?.offsetWidth || 0;
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const boxHeight = boxRef.current?.offsetHeight || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;
    let newTop = boxPosition.top + topOffset;
    let newLeft = boxPosition.left + leftOffset;

    //1 make sure position can never be negative
    // 2 make sure position can not move beyond the size of container
    //    - What is the value of left so the box is considered as outside the container
    //          box width + box left can not be larger than container width
    //  - top
    //   box height + box top can not be larger than container height
    //
    // Do 14-15-20

    // Negative 2 for the border pixels
    if (newLeft + boxWidth > containerWidth) {
      newLeft = containerWidth - boxWidth - 2;
    }

    if (newTop + boxHeight > containerHeight) {
      newTop = containerHeight - boxHeight - 2;
    }

    setBoxPosition({
      top: newTop >= 0 ? newTop : 0,
      left: newLeft >= 0 ? newLeft : 0,
    });
  };
  const moveOnKey = useMemo(() => {
    return (e: KeyboardEvent) => {
      console.log('this key is:', e.key);
      if (e.key === 'ArrowUp') {
        move(0, -10);
      } else if (e.key === 'ArrowLeft') {
        move(-10, 0);
      } else if (e.key === 'ArrowDown') {
        move(0, 10);
      } else if (e.key === 'ArrowRight') {
        move(10, 0);
      }
    };
  }, [boxPosition]);

  useEffect(() => {
    document.addEventListener('keydown', moveOnKey);

    return function cleanup() {
      document.removeEventListener('keydown', moveOnKey);
    };
  }, [moveOnKey]);

  return (
    <div className={styles.container}>
      <div className={styles['button-container']}>
        <div className={styles.button} onClick={() => move(0, -10)}>
          Up
        </div>
        <div className={styles.button} onClick={() => move(-10, 0)}>
          Left
        </div>
        <div className={styles.button} onClick={() => move(0, 10)}>
          Down
        </div>
        <div className={styles.button} onClick={() => move(10, 0)}>
          Right
        </div>
      </div>
      <div ref={containerRef} className={styles['border-box']}>
        <div
          ref={boxRef}
          className={styles.box}
          style={{
            top: `${boxPosition.top}px`,
            left: `${boxPosition.left}px`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default Item14;
