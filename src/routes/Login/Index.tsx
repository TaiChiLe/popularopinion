import './Index.css';
import React, { useEffect } from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, notification, Typography } from 'antd';
import supabase from '../../utils/supabase';
import Password from 'antd/es/input/Password';
import { Link, useNavigate } from 'react-router-dom';

type FieldType = {
  email?: string;
  password?: string;
};

function Login() {
  const navigate = useNavigate();
  const [api, contextholder] = notification.useNotification();
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    //we need supbase to verify current user
    try {
      const data = await supabase.auth.signInWithPassword({
        email: values.email!,
        password: values.password!,
      });

      if (data.error) {
        api.open({
          message: 'Failed to login',
          type: 'warning',
        });
      } else {
        api.open({
          message: 'Login successul',
          type: 'success',
        });
        console.log('success');
        navigate('/main');
      }
    } catch (e) {
      console.log('Failed to login', e);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      className="container"
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextholder}
      <Typography.Title>Login</Typography.Title>
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
        Don't have an account <Link to="/register">Sign up</Link>
      </div>
    </Form>
  );
}

export default Login;
