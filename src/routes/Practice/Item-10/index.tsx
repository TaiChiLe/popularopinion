import Title from 'antd/es/typography/Title';
import styles from './index.module.css';
import { Button } from 'antd';
import { useEffect, useState } from 'react';

function Item10() {
  const [listItems, setListItems] = useState<Array<string>>([]);
  const [displayHorizontal, setDisplayHorizontal] = useState(false);

  const onInsertEndItemClick = () => {
    setListItems([...listItems, '']);
  };

  const onRemoveEndItemClick = () => {
    setListItems(listItems.slice(0, -1));
  };

  const onInsertStartItemClick = () => {
    setListItems(['', ...listItems]);
  };

  const onRemoveFirstItemClick = () => {
    setListItems(listItems.slice(1, listItems.length));
  };

  return (
    <div className={styles.container}>
      <Title>Manage List Items</Title>
      <div className={styles['button-container']}>
        <Button onClick={onInsertEndItemClick} type="primary">
          Insert at end
        </Button>
        <Button onClick={onRemoveEndItemClick} color="danger" variant="solid">
          Remove last item
        </Button>
      </div>
      <div className={styles['button-container']}>
        <Button onClick={onInsertStartItemClick} type="primary">
          Insert at start
        </Button>
        <Button onClick={onRemoveFirstItemClick} color="danger" variant="solid">
          Remove first item
        </Button>
      </div>
      <div className={styles['button-container']}>
        <Button
          onClick={() => setDisplayHorizontal(!displayHorizontal)}
          type="primary"
        >
          Display Horizontal
        </Button>
      </div>
      <div>
        <ul className={`${displayHorizontal ? styles.horizontal : ''}`}>
          {listItems.map((_, index) => (
            <li key={index}>Item {index + 1}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Item10;
