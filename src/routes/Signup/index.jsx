import React from 'react';
import { Flex } from 'antd';
import './index.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Typography, Button, Input, Space } from 'antd';
const { Title } = Typography;

const baseStyle = {
  width: '25%',
  height: 54,
};

function Signup() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Flex>
      <div style={{ width: '50vw', height: '100vh', backgroundColor: 'white' }}>
        <Flex
          align="center"
          justify="center"
          vertical
          style={{ height: '100vh' }}
        >
          <div className="card">
            <Flex
              align="center"
              justify="center"
              vertical
              style={{ height: '80vh' }}
            >
              <Title level={2}>Create you account</Title>
              <Button style={{ marginTop: '20px' }} type="primary">
                Sign up with Google
              </Button>
              <Title level={5}>Or use email</Title>

              <div style={{ width: '200px' }}>
                <Input placeholder="Email" />
                <Input.Password placeholder="input password" />
                <Input.Password placeholder="input password" />
              </div>
              <Button
                style={{
                  backgroundColor: '#6DD4C7',
                  color: 'white',
                  marginTop: '20px',
                }}
              >
                Sign Up
              </Button>
              <Title level={5}>
                Already have an account? <a href="/">Log In</a>
              </Title>
            </Flex>
          </div>
        </Flex>
      </div>
      <div
        style={{ width: '50vw', height: '100vh', backgroundColor: '#6DD4C7' }}
      >
        <Flex
          align="center"
          justify="center"
          vertical
          style={{ height: '100vh' }}
        >
          <img className="background-image" src="/background.png" alt="" />
        </Flex>
      </div>
    </Flex>
  );
}

export default Signup;
