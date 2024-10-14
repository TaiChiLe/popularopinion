import { Flex } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { message, Upload, Avatar } from 'antd';
const { Title } = Typography;
const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
function Header() {
  return (
    <>
      <Flex className="header-wrapper" align="center" justify="space-between">
        <div>
          <Title className="title">PopOp</Title>
        </div>
        <div className="header-icons">
          <Flex gap="middle" align="center">
            <Input placeholder="Search..." />
            <div>
              <i class="bi bi-search"></i>
            </div>
            <a href="/profilesettings">
              <i class="bi bi-gear-fill"></i>
            </a>
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
