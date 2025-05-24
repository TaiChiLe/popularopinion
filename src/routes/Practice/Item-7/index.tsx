import Title from 'antd/es/typography/Title';
import styles from './index.module.css';
import { Button, Divider } from 'antd';
import { useState } from 'react';
function Item7() {
  const [showDetails, setShowDetails] = useState(true);
  const details = {
    name: 'John Doe',
    age: 30,
    occupation: 'Software Engineer',
  };
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className={styles.container}>
      <Title>Person Details</Title>
      <Divider></Divider>
      {showDetails && (
        <div>
          <div>
            <strong>Name:</strong> {details.name}
          </div>
          <div>
            <strong>Age:</strong> {details.age}
          </div>
          <div>
            <strong>Occupation:</strong> {details.occupation}
          </div>
        </div>
      )}
      {!showDetails && 'Content Hidden'}
      <Button onClick={toggleDetails}>
        {showDetails ? 'Hide' : 'Show'} Details
      </Button>
    </div>
  );
}

export default Item7;
