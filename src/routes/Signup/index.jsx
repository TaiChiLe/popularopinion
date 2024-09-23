import React from 'react';
import { Flex } from 'antd';
import './index.css';
import { Typography, Button, Input, Col, Row } from 'antd';
const { Title } = Typography;

function Signup() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  return (
    <Row>
      <Col
        xs={{
          flex: '100%',
        }}
        sm={{
          flex: '100%',
        }}
        md={{
          flex: '50%',
        }}
      >
        <div style={{ height: '100vh', backgroundColor: 'white' }}>
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
      </Col>
      <Col
        xs={{
          flex: '100%',
        }}
        sm={{
          flex: '100%',
        }}
        md={{
          flex: '50%',
        }}
      >
        <div style={{ height: '100vh', backgroundColor: '#6DD4C7' }}>
          <Flex
            align="center"
            justify="center"
            vertical
            style={{ height: '100vh' }}
          >
            <img className="background-image" src="/background.png" alt="" />
          </Flex>
        </div>
      </Col>
    </Row>
  );
}

export default Signup;
