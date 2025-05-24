import { Button, Input } from 'antd';
import styles from './index.module.css';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';

function Item4() {
  const [input, setInput] = useState('');

  const getInput = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Title>Convert Text to Uppercase</Title>
      <Input value={input} onChange={getInput}></Input>
      <Button onClick={() => setInput(input.toUpperCase())} type="primary">
        Convert to uppercase
      </Button>
    </div>
  );
}

export default Item4;
