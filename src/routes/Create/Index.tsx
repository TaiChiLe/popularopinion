import './index.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { Form, Input, Button, notification } from 'antd';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Authenticated } from '../../Components/Authenticated';
const { TextArea } = Input;
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function Create() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
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
        const voteOptions = values.voteOptions;
        supabase
          .rpc('insert_polls', {
            question: values.question,
            user_id: userId,
            url: values.url || '',
          })
          .then((data) => {
            console.log('Question ID:', data.data);
            const pollId = data.data;
            if (!data.error) {
              if (voteOptions) {
                console.log('VoteOptions:', voteOptions);
                voteOptions.map((voteOption) => {
                  supabase
                    .rpc('insert_poll_options', {
                      poll_id: pollId,
                      option_text: voteOption,
                    })
                    .then((data2) => {
                      if (!data2.error) {
                        notification.success({
                          type: 'success',
                          message: 'Question Options Added',
                        });
                      } else {
                        console.log('Error', data2.error);
                        notification.error({
                          type: 'error',
                          message: 'Question Options Not Added',
                        });
                      }
                    });
                  console.log('Vote Options Added:', voteOption);
                });
              }
              notification.success({
                type: 'success',
                message: 'Question Added',
              });

              navigate('/main');
            } else {
              notification.error({
                type: 'error',
                message: 'Question Not Added',
              });
            }
          });
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

          <Form.List
            name="voteOptions"
            rules={[
              {
                validator: async (_, voteOptions) => {
                  if (voteOptions?.length == 1) {
                    return Promise.reject(new Error('At least 2 vote options'));
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? 'Voting Options' : ''}
                    required={false}
                    key={field.key}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={['onChange', 'onBlur']}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input option or delete this field.',
                        },
                      ]}
                      noStyle
                    >
                      <Input
                        placeholder="Voting Option"
                        style={{ width: '60%' }}
                      />
                    </Form.Item>
                    {fields.length > 0 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    style={{ width: '60%' }}
                    icon={<PlusOutlined />}
                  >
                    Add Voting Option
                  </Button>

                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>

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
