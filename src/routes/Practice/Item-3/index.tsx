import Title from 'antd/es/typography/Title';
import { Button, Form, Input } from 'antd';
import styles from './Index.module.css';
import { useState } from 'react';
import type { FormProps } from 'antd';

function Item3() {
  const [name, setName] = useState({});

  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
    setName({ firstName: values.firstName, lastName: values.lastName });
  };
  return (
    <div className={styles.container}>
      <Title>Enter Your Name</Title>
      <div className={styles['input-container']}>
        <Form onFinish={onFinish} layout="inline">
          <Form.Item name="firstName">
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item name="lastName">
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Show Full Name
            </Button>
          </Form.Item>
        </Form>
      </div>
      {name.firstName} {name.lastName}
    </div>
  );
}

export default Item3;
