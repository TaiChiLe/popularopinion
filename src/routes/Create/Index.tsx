import './index.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Form, Input, Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';
import { CreateForm } from './CreateForm';
import type { FormProps } from 'antd';
import { Authenticated } from '../../Components/Authenticated';
const { TextArea } = Input;

function Create() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);
  const [api, contextholder] = notification.useNotification();

  type FieldType = {
    question: string;
    url?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    //we need supbase to verify current user
    try {
      let error;
      if (userId && values.question) {
        error = await supabase.from('polls').insert({
          question: values.question,
          user_id: userId,
          url: values.url,
        });
        api.open({ type: 'success', message: 'Question Successfully Posted!' });
        navigate('/main');
      } else {
        console.log(userId);
        error = 'User not logged in or question empty';
      }

      if (error) {
        console.log(error);
      } else {
        console.log(`Question Added! ${values.question}`);
      }
    } catch (e) {
      console.log('Create question failed', e);
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo
  ) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    async function fetchUserId() {
      // Fetch the current session
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData?.session);
      setUserId(sessionData?.session?.user?.id);
    }
    fetchUserId();
  }, []);

  return (
    <Authenticated>
      {contextholder}
      <Header />
      <div className="form-container">
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="horizontal"
        >
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: 'Please input a question!' }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item name="url" label="Image / Video Link">
            <Input placeholder="https://imagelink.jpg" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </Authenticated>
  );
}

export default Create;
