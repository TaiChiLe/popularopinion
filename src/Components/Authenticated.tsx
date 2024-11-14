import { useEffect, useState } from 'react';
import supabase from '../utils/supabase.ts';
import { Button } from 'antd';

export function Authenticated(props) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return (
      <div className="authenticated">
        <div>Please Sign In</div>
        <Button href="./login2" type="primary">
          Sign In
        </Button>
      </div>
    );
  } else {
    return props.children;
  }
}
