import Title from 'antd/es/typography/Title';
import styles from './index.module.css';
import { Button } from 'antd';
import { useState } from 'react';

function Item9() {
  const [listItems, setListItems] = useState<Array<string>>([]);

  const onInsertItemClick = () => {
    setListItems([...listItems, '']);
  };

  const onRemoveItemClick = () => {
    setListItems(listItems.slice(0, -1));
  };

  return (
    <div className={styles.container}>
      <Title>Manage List Items</Title>
      <div className={styles['button-container']}>
        <Button onClick={onInsertItemClick} type="primary">
          Insert new Item
        </Button>
        <Button onClick={onRemoveItemClick} color="danger" variant="solid">
          Remove last item
        </Button>
      </div>
      <div>
        <ul>
          {listItems.map((__, index) => (
            <li key={index}>Item {index + 1}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Item9;
