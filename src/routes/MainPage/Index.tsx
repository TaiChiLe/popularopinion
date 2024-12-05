import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { Authenticated } from '../../Components/Authenticated';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { PollDetails } from '../PollDetails/Index';
import './Index.css';

export function MainPage() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    async function getPolls() {
      const { data } = await supabase.from('polls').select();
      setPolls(data);
    }

    getPolls();
  }, []);

  return (
    <Authenticated>
      <Header></Header>
      <div className="main-page-container">
        {polls.map((poll) => (
          <PollDetails key={poll.id} id={poll.id}></PollDetails>
        ))}
      </div>
      <Footer></Footer>
    </Authenticated>
  );
}
