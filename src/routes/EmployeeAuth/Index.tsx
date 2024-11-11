import { Auth } from '@supabase/auth-ui-react';
import supabase from '../../utils/supabase.ts';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import './Index.css';

export function EmployeeAuth() {
  return (
    <div className="sign-in-container">
      <h1>Sign in / Sign up</h1>
      <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
    </div>
  );
}
