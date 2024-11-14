import supabase from '../../utils/supabase.ts';

export function Logout() {
  const onClick = () => {
    supabase.auth.signOut();
  };

  return (
    <div>
      <button onClick={onClick}>Logout</button>
    </div>
  );
}
