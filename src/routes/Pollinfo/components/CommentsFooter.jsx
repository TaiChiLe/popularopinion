import { Flex } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { message, Upload, Avatar } from 'antd';
function CommentsFooter() {
  return (
    <>
      <Flex
        gap="small"
        className="footer-wrapper comment-wrapper"
        align="center"
        justify="space-around"
      >
        <Input size="large" placeholder="Write a comment..." />
        <i class="bi bi-caret-right-fill"></i>
      </Flex>
    </>
  );
}

export default CommentsFooter;
