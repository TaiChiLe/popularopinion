import { Flex } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { message, Upload, Avatar } from 'antd';
const { Title } = Typography;

function Header() {
  return (
    <>
      <div className="header-space"></div>
      <Flex
        className="header-wrapper-comments"
        align="center"
        justify="space-between"
      >
        <a href="/mainpage">
          <i class="bi bi-caret-left"></i>
        </a>
        <div className="header-icons">
          <Flex gap="small" align="center">
            <div>
              <i class="bi bi-search"></i>
            </div>
            <a href="/profile">
              <Avatar
                className="avatar-btn"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
            </a>
          </Flex>
        </div>
      </Flex>
    </>
  );
}

export default Header;
