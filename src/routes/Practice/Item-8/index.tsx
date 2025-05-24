import styles from './index.module.css';
import Title from 'antd/es/typography/Title';
import { useState } from 'react';
import { Button, Divider, Form, Input } from 'antd';

type Profile = {
  firstname: string;
  lastname: string;
  age: number;
  occupation: string;
  avatar: string;
};

function Item8() {
  const [profileDetails, setProfileDetails] = useState<Profile>();

  const onFinish = (value: Profile) => {
    setProfileDetails(value);
  };

  return (
    <div className={styles.container}>
      {profileDetails && (
        <div className={styles['profile-container']}>
          <Title>Profile Details</Title>
          <Divider></Divider>
          <div className={styles['details-container']}>
            <div>
              <img
                className={styles.image}
                src={profileDetails.avatar}
                alt=""
              />
            </div>
            <div>
              <div>
                <strong>Name:</strong> {profileDetails.firstname}{' '}
                {profileDetails.lastname}
              </div>
              <div>
                <strong>Age:</strong> {profileDetails.age}
              </div>
              <div>
                <strong>Occupation:</strong> {profileDetails.occupation}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles['form-container']}>
        <Title>Enter and Submit Your Details</Title>
        <Divider></Divider>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="firstname" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item name="lastname" label="Last Name">
            <Input />
          </Form.Item>
          <Form.Item name="age" label="Age">
            <Input />
          </Form.Item>
          <Form.Item name="occupation" label="Occupation">
            <Input />
          </Form.Item>
          <Form.Item name="avatar" label="Avatar URL">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Item8;
