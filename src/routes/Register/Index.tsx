import type { FormProps } from 'antd';
import { Button, notification, Form, Input, Typography } from 'antd';
import supabase from '../../utils/supabase';
import { Link } from 'react-router-dom';
import styles from './Index.module.css';

type FieldType = {
  email?: string;
  password?: string;
};

export function Register() {
  const [api, contextHolder] = notification.useNotification();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    // We need to use SUpabase to verify current user
    try {
      const data = await supabase.auth.signUp({
        email: values.email!,
        password: values.password!,
      });

      if (data.error) {
        api.open({
          type: 'warning',
          message: 'Failed to Sign up',
        });
      } else {
        api.open({
          type: 'success',
          message: 'Sign up done!',
        });
      }
    } catch (e) {
      console.log('failed to log in', e);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className={styles.container}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Typography.Title>Sign up</Typography.Title>
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      <div>
        Have an account <Link to="/login">Sign in</Link>
      </div>
    </Form>
  );
}
