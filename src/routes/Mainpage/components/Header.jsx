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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Flex align="center" justify="space-around">
        <div>
          <Title style={{ color: 'white' }}>Popular Opinion</Title>
        </div>
        <div>
          <i onClick={showModal} class="bi bi-plus-circle"></i>
        </div>
        <div>
          <i class="bi bi-bell"></i>
        </div>
        <a href="/profile">
          <Avatar
            className="avatar-btn"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a>
      </Flex>
      <Modal
        title="Post a question"
        open={isModalOpen}
        onOk={handleOk}
        okText="Submit"
        onCancel={handleCancel}
      >
        <Input placeholder="Question" />
        <div className="space"></div>
        <Input placeholder="Image or Video Link" />
        <div className="space"></div>
        <p>Upload a file:</p>
        <Upload {...props}>
          <Button>Click to Upload</Button>
        </Upload>
      </Modal>
    </>
  );
}

export default Header;
