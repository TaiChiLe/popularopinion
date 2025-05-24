import { Button, Input } from 'antd';
import styles from './index.module.css';
import { useState } from 'react';

function Item2() {
  const [input, setInput] = useState('');

  const onButtonClick = () => {
    setInput('A button is clicked');
  };
  return (
    <div className={styles.container}>
      <Input value={input}></Input>
      <Button onClick={onButtonClick} type="primary">
        Click me to change the input value
      </Button>
    </div>
  );
}

export default Item2;
