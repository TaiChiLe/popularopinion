import { Flex } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { message, Upload, Avatar } from 'antd';
const { Title } = Typography;
import { useNavigate } from 'react-router-dom';

function Header() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/mainpage`;
    navigate(path);
  };

  return (
    <>
      <Flex align="center" justify="space-around">
        <div>
          <Title style={{ color: 'white' }}>Account</Title>
        </div>
        <div>
          <i onClick={routeChange} class="bi bi-house"></i>
        </div>
        <div>
          <a href="/profilesettings">
            <i class="bi bi-gear"></i>
          </a>
        </div>

        <Avatar
          className="avatar-btn avatar-active"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </Flex>
    </>
  );
}

export default Header;
