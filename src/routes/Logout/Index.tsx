import supabase from '../../utils/supabase.ts';
import { useNavigate } from 'react-router-dom';

export function Logout() {
  const navigate = useNavigate();
  const onClick = () => {
    supabase.auth.signOut();
    navigate('/login2');
  };

  return (
    <div>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}
