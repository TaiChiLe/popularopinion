import { Auth } from '@supabase/auth-ui-react';
import supabase from '../../utils/supabase.ts';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import './Index.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function EmployeeAuth() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_IN') {
          console.log('User signed in:', session);
          supabase
          .rpc('get_user', {
            user_id: session?.user.id,
          })
          .then(({ data, error }) => {
            if (error) {
              console.error(error);
              return;
            }
            setUserData(data);

            console.log(userData);
          navigate('/main'); // Redirect to dashboard
        }
      }
    );

    // Cleanup subscription on component unmount
    return () => authListener?.subscription?.unsubscribe();
  }, [navigate]);

  return (
    <div className="sign-in-container">
      <h1>Sign in / Sign up</h1>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  );
}
