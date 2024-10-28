import { Input, Typography, Anchor, CheckboxProps, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Index.css';

const Text = Typography;
const onChange: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
function Register() {
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

      <Input.Password
        className="login-inputs"
        placeholder="confirm password"
        prefix={<LockOutlined></LockOutlined>}
      />
      <div className="signin-btn">
        <Button type="primary">Register</Button>
      </div>
    </div>
  );
}

export default Register;
