import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  notification,
  Select,
} from 'antd';
import './Index.css';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Authenticated } from '../../Components/Authenticated';
dayjs.extend(customParseFormat);

function Onboarding() {
  const [countries, setCountries] = useState(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userData, setUserData] = useState();
  const navigate = useNavigate();

  // Create a form instance
  const [form] = Form.useForm();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);

      if (!session) {
        navigate('/sign-in');
      }
    });

    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        // Sort countries by name
        const sortedCountries = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setCountries(sortedCountries);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!session) return;

    supabase
      .rpc('get_user', {
        user_id: session.user.id,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setUserData(data);

        form.setFieldsValue({
          firstname: data.firstname,
          lastname: data.lastname,
          location: data.location,
          dob: dayjs(data.dob, 'YYYY-MM-DD').isValid() ? dayjs(data.dob) : null,
          displayname: data.displayname,
          email: session.user.email,
        });
      });
  }, [session, form]);

  type FieldType = {
    displayname?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    dob?: string;
    location?: string;
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
    supabase
      .rpc('upsert_user', {
        user_id: session?.user.id,
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        dob: values.dob,
        location: values.location,
        display_name: values.displayname,
      })
      .then(() => {
        notification.success({
          type: 'success',
          message: 'User information updated',
        });
        navigate('/main');
      });
  };

  return (
    <Authenticated>
      <Header />
      <div className="onboarding-container">
        <h1>Onboarding</h1>
        <Form
          form={form} // Attach the form instance
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item<FieldType> label="Display Name" name="displayname">
            <Input placeholder="SlickWick" />
          </Form.Item>
          <Form.Item<FieldType> label="First Name" name="firstname">
            <Input placeholder="John" />
          </Form.Item>
          <Form.Item<FieldType> label="Last Name" name="lastname">
            <Input placeholder="Wick" />
          </Form.Item>
          <Form.Item<FieldType> label="Email" name="email">
            <Input placeholder="SlickWick@gmail.com" />
          </Form.Item>
          <Form.Item<FieldType> label="Date of birth" name="dob">
            <DatePicker format="DD/MM/YYYY" />
          </Form.Item>
          <Form.Item<FieldType> label="Location" name="location">
            <Select>
              {countries?.map((country) => (
                <Select.Option key={country.cca3} value={country.name.common}>
                  {country.name.common}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </Authenticated>
  );
}

export default Onboarding;
