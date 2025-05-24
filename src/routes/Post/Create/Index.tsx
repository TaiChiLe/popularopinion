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
    console.log(values);
    //Construct the data
    try {
      const voteType = values.voteType;
      const postTitle = values.question;
      let options = [];

      if (voteType === 'binary') {
        options = [
          {
            label: values.voteOptionA,
          },
          { label: values.voteOptionB },
        ];
      } else {
        //Vote Type is single and multi choices
        options = values.voteOptions.map((option, index) => ({
          label: option,
        }));
      }

      //store settings into object to be parsed into DB
      const settings = {
        options: options,
        url: values.url || '',
      };

      const currentISODate = new Date().toISOString();

      const postData = {
        post_title: postTitle,
        post_type: voteType,
        post_updated: currentISODate,
        post_active: true,
        post_user_id: userId,
        post_settings: settings,
      };

      supabase.rpc('insert_posts', { data: postData }).then((data) => {
        console.log('insert_posts data', data);
        const postID = data.data;
        console.log('postID', postID);
        //Once post data is inserted, we need to insert postMetadata
        //create the data in metadata table
        const vote_count = 0;
        let metaData = {};
        if (voteType === 'binary') {
          metaData = {
            data: [0, 0],
          };
        } else if (voteType === 'single' || voteType === 'multi') {
          //create array for data
          let newArray = [];
          for (let i = 0; i < values.voteOptions.length; i++) {
            newArray.push(0);
          }
          console.log(newArray);
          metaData = {
            data: newArray,
          };
        }
        //
        const postMetaData = {
          meta_post_id: postID,
          meta_count: vote_count,
          meta_data: metaData,
        };

        console.log('PostMetaData', postMetaData);
        supabase
          .rpc('upsert_post_metadata', {
            data: postMetaData,
          })
          .then((data) => {
            console.log('New Post Data Return', data.data);
            console.log('New Post Data Return error', data.error);
            if (!data.error) {
              notification.success({
                type: 'success',
                message: 'Question Added',
              });
              navigate('/main');
            }
          });
      });
      console.log('Options:', postData);
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
          <Form.Item label="Select Vote Type" name="voteType">
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
