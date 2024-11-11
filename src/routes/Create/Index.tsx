import './index.css';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { PlusOutlined } from '@ant-design/icons';
import { DatePicker, Form, Input, Upload, Button } from 'antd';
import { Authenticated } from '../../Components/Authenticated';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

function Create() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [userId, setUserId] = useState(null); // Set user ID at the top level
  const [session, setSession] = useState(null);

  function captureQuestion(e) {
    const text = e.target.value; // Corrected to capture the value
    setQuestion(text);
  }

  async function submitQuestion() {
    console.log(question); // Logs the question to the console
    let error;
    if (userId && question) {
      error = await supabase
        .from('polls')
        .insert({ question: question, user_id: userId });

      navigate('/main');
    } else {
      error = 'User not logged in or question empty';
    }

    if (error) {
      console.log(error);
    } else {
      console.log(`Question Added! ${question}`);
    }
  }

  useEffect(() => {
    async function fetchUserId() {
      // Fetch the current session on component mount
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData?.session);

      // Set the user ID if a session exists
      if (sessionData?.session?.user?.id) {
        setUserId(sessionData.session.user.id);
      }

      // Listen for session changes (e.g., login, logout)
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (_event, updatedSession) => {
          setSession(updatedSession);

          // Update the user ID when the session changes
          if (updatedSession?.user?.id) {
            setUserId(updatedSession.user.id);
          } else {
            setUserId(null); // Clear user ID if logged out
          }
        }
      );

      // Cleanup the listener on unmount
      return () => {
        authListener?.unsubscribe();
      };
    }
    fetchUserId();
  }, []);
  return (
    <>
      <Header />
      <div className="form-container">
        <Form layout="horizontal">
          <Form.Item label="Question">
            <TextArea onChange={captureQuestion} rows={2} />
          </Form.Item>
          <Authenticated>
            <Form.Item>
              <Authenticated>
                {/* Corrected onClick event */}
                <Button onClick={submitQuestion} type="primary">
                  Submit
                </Button>
              </Authenticated>
            </Form.Item>
          </Authenticated>
        </Form>
      </div>
      <Footer />
    </>
  );
}

export default Create;
