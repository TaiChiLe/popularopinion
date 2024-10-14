import { Button, Form, Input, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
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

function Pollform() {
  const [form] = Form.useForm();
  return (
    <div className="form-wrapper">
      <Form layout="vertical" form={form}>
        <Form.Item label="Poll Info">
          <Input placeholder="What is your poll?" />
        </Form.Item>
        <Form.Item label="Image or Video URL">
          <Input placeholder="Https://..." />
        </Form.Item>

        <Form.Item label="Or Upload a File (Image or Video)">
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 0,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Pollform;
