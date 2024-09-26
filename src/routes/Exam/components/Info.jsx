import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;
const selectBefore = (
  <Select defaultValue="Alipay">
    <Option value="Alipay">Alipay</Option>
  </Select>
);
const Info = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      labelCol={{
        span: 12,
      }}
      wrapperCol={{
        span: 12,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 800,
      }}
    >
      <Form.Item label="Payment account">
        <Select defaultValue="test@example.com">
          <Select.Option value="demo">ant-design@alipay.com</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Recipient account">
        <Input addonBefore={selectBefore} defaultValue="test@example.com" />
      </Form.Item>
      <Form.Item label="Recipient Name:">
        <Input />
      </Form.Item>
      <Form.Item label="Amount:">
        <InputNumber addonBefore="$" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 12,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Info;
