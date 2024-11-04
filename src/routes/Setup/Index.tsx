import { Typography } from 'antd';
import type { FormProps } from 'antd';
import { Button, DatePicker, Form, Input, Select, Checkbox } from 'antd';

import './Index.css';

const Text = Typography;
const { RangePicker } = DatePicker;
function Setup() {
  const [form] = Form.useForm();
  return (
    <div className="container">
      <Text className="title">Popular Opinion</Text>
      <Form
        className="form-container"
        layout="vertical"
        form={form}
        initialValues={{ layout: 'vertical' }}
      >
        <Form.Item label="First Name">
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item label="Date of Birth">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Country">
          <Select>
            <Select.Option value="AU">Australia</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="tech" valuePropName="tech">
          <Checkbox>Technology</Checkbox>
        </Form.Item>
        <Form.Item name="sport" valuePropName="sport">
          <Checkbox>Sports</Checkbox>
        </Form.Item>
        <Form.Item name="politics" valuePropName="politics">
          <Checkbox>Politics</Checkbox>
        </Form.Item>
        <Form.Item name="food" valuePropName="food">
          <Checkbox>Food</Checkbox>
        </Form.Item>
        <Form.Item name="entertainment" valuePropName="entertainment">
          <Checkbox>Entertainment</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Setup;
