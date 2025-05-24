import { Button } from 'antd';
import styles from './index.module.css';

function Item1() {
  return (
    <div className={styles.container}>
      <Button onClick={() => alert('Button Clicked')} type="primary">
        Click me to open an alert
      </Button>
    </div>
  );
}

export default Item1;
