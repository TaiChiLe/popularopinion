import './Index.css';
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Input, Typography } from 'antd';
import { Checkbox } from 'antd';
import { CheckboxProps, Anchor, Button } from 'antd';

const Text = Typography;
const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
function Login() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <div className="container">
      <Text className="title">Popular Opinion</Text>
      <div className="signin-header">
        <Anchor
          direction="horizontal"
          items={[
            {
              key: 'part-1',
              href: '/login',
              title: 'Login',
            },
            {
              key: 'part-2',
              href: '/register',
              title: 'Register',
            },
          ]}
        />
      </div>

      <Input
        className="login-inputs"
        placeholder="Username"
        prefix={<UserOutlined />}
      />
      <Input.Password
        className="login-inputs"
        placeholder="input password"
        prefix={<LockOutlined></LockOutlined>}
      />
      <div className="login-footer">
        <Checkbox onChange={onChange}>Remember me</Checkbox>
        <a>
          <Text>Forgot your password?</Text>
        </a>
      </div>
      <div className="signin-btn">
        <Button type="primary">Sign In</Button>
      </div>
      <Text>Quick Sign-in:</Text>
      <Button type="primary">Sign in with Google</Button>
      <Button type="primary">Sign in with Facebook</Button>
    </div>
  );
}

export default Login;
