import './index.css';
import Header from '../../../Components/Header';
import Footer from '../../../Components/Footer';
import { Form, Input, Button, notification, Select } from 'antd';
import { useEffect, useState } from 'react';
import supabase from '../../../utils/supabase';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import { Authenticated } from '../../../Components/Authenticated';
const { TextArea } = Input;
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function Create() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [api, contextholder] = notification.useNotification();
  const [selectedVoteType, setSelectedVoteType] = useState(null);

  const handleVoteTypeChange = (value) => {
    setSelectedVoteType(value);
    console.log(value);
  };

  type FieldType = {
    question: string;
    url?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    try {
      let error;
      if (userId && values.question && !values.voteOptions) {
        const postSettings = {
          image_video_url: values.url || '',
          options: [
            { label: values.voteOptionA },
            { label: values.voteOptionB },
          ],
        };

        console.log('postSettings:', postSettings);
        supabase
          .rpc('insert_posts', {
            post_title: values.question,
            post_user_id: userId,
            post_settings: postSettings,
            post_type: 'yes-no',
            post_active: true,
          })
          .then((data) => {
            console.log('Question ID:', data.data);
            const pollId = data.data;

            if (!data.error) {
              const metadata = {
                no_votes: 0,
                yes_votes: 0,
              };

              supabase
                .rpc('upsert_post_metadata', {
                  meta_count: 0,
                  meta_data: metadata,
                  meta_post_id: pollId,
                })
                .then((data) => {
                  console.log('upserted metadata', data);
                });

              if (error) {
                console.log('Error upserting metadata', error);
              }

              notification.success({
                type: 'success',
                message: 'Question Added',
              });

              // navigate('/main');
            } else {
              notification.error({
                type: 'error',
                message: 'Question Not Added',
              });
            }
          });
      } else {
        // voted has multiple options
        // insert posts
        // create the data
        const voteOptions = values.voteOptions;
        console.log('values are', voteOptions);
        const choices = {
          image_url: values.url || '',
          options: voteOptions,
        };
        const postData = {
          post_active: true,
          post_settings: choices,
          post_title: values.question,
          post_type: 'single-choice',
          post_user_id: userId,
        };

        //insert post
        supabase.rpc('insert_posts', postData).then((data) => {
          console.log('Question ID:', data.data);
          //create metadata
          const postId = data.data;
          const vote_count = 0;
          const obj = values.voteOptions.reduce((acc, curr) => {
            acc[curr] = 0; // Set the key and value to be the array element
            return acc;
          }, {} as { [key: string]: string });

          console.log('New Object', obj);

          supabase
            .rpc('upsert_post_metadata', {
              meta_count: vote_count,
              meta_data: obj,
              meta_post_id: postId,
            })
            .then((data) => {
              console.log('upserted metadata', data);
              // navigate('/main');
            });
        });
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
          <Form.Item label="Select Vote Type" name="vote-option">
            <Select onChange={handleVoteTypeChange}>
              <Select.Option value="binary">Binary Vote</Select.Option>
              <Select.Option value="single">Single Choice Vote</Select.Option>
              <Select.Option value="multi">Multi Choice Vote</Select.Option>
            </Select>
          </Form.Item>
          {selectedVoteType === 'binary' && (
            <>
              <Form.Item
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Please input option',
                  },
                ]}
                name="voteOptionA"
              >
                <Input placeholder="Yes" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Please input option',
                  },
                ]}
                name="voteOptionB"
              >
                <Input placeholder="No" />
              </Form.Item>
            </>
          )}

          {(selectedVoteType === 'multi' || selectedVoteType === 'single') && (
            <Form.List
              name="voteOptions"
              rules={[
                {
                  validator: async (_, voteOptions) => {
                    if (voteOptions?.length <= 2) {
                      return Promise.reject(
                        new Error('At least 3 vote options')
                      );
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
                            message:
                              'Please input option or delete this field.',
                          },
                        ]}
                        noStyle
                      >
                        <Input placeholder="Voting Option" />
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
                      icon={<PlusOutlined />}
                    >
                      Add Voting Option
                    </Button>

                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          )}
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
