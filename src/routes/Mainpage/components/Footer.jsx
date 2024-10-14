import { Flex } from 'antd';
import { Typography } from 'antd';
import { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { message, Upload, Avatar } from 'antd';
function Footer() {
  return (
    <>
      <Flex className="footer-wrapper" align="center" justify="space-around">
        <div>
          <a href="/mainpage">
            <Flex vertical align="center">
              <i class="bi bi-house footer-icons"></i>
              <div>Home</div>
            </Flex>
          </a>
        </div>
        <div>
          <a href="/createpoll">
            <Flex vertical align="center">
              <i class="bi bi-plus-circle footer-icons"></i>
              <div>Create</div>
            </Flex>
          </a>
        </div>
        <div>
          <Flex vertical align="center">
            <i class="bi bi-bell footer-icons"></i>
            <div>Alerts</div>
          </Flex>
        </div>
      </Flex>
    </>
  );
}

export default Footer;
