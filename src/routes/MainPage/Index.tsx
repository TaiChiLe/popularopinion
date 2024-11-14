import { useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import './Index.css';
import { Button } from 'antd';
import supabase from '../../utils/supabase';
import { Authenticated } from '../../Components/Authenticated';

function MainPage() {
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState([]);
  const [userId, setUserId] = useState(null); // Set user ID at the top level
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getPolls() {
      const { data } = await supabase.from('polls').select();
      if (data) {
        setPolls(data);
      }
    }

    async function getVotes() {
      const { data } = await supabase.from('votes').select();
      if (data) {
        setVotes(data);
      }
    }

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

    getVotes();
    getPolls();
    fetchUserId(); // Fetch user ID once on component mount
  }, [votes]);

  function getTotalVotesByID(id) {
    const totalVotes = votes.filter((vote) => vote.poll_id === id);
    return totalVotes.length;
  }

  function getTotalVotesbyType(id, voteType) {
    const filteredVotes = votes.filter(
      (vote) => vote.poll_id === id && vote.vote_choice === voteType
    );
    return filteredVotes.length;
  }

  async function handleVote(vote_id: number, vote_choice: boolean) {
    if (!userId) {
      console.error('User is not logged in.');
      return;
    }

    const voteData = {
      votes_user_id: userId,
      votes_id: vote_id,
      votes_choice: vote_choice,
    };

    console.log(voteData);

    const { data, error: error2 } = await supabase.rpc(
      'upsert_votes',
      voteData
    );

    if (error2) {
      console.error('Error upserting vote:', error2);
      alert(error2.message);
    } else {
      console.log('Vote upserted:', data);
      const { newVotesData } = await supabase.from('votes').select();
      if (newVotesData) {
        setVotes(newVotesData); // Update the local state to reflect the vote
      }
    }
  }

  return (
    <>
      <Header />

      <div className="main-page-container">
        {polls.map((poll) => (
          <div className="post" key={poll.id}>
            <div className="post-background">
              <div className="post-question">{poll.question}</div>
            </div>
            <div>
              <div className="vote-results">
                Current Votes Total: {getTotalVotesByID(poll.id)}
              </div>
              <div className="vote-results">
                Current Votes Up: {getTotalVotesbyType(poll.id, true)}
              </div>
              <div className="vote-results">
                Current Votes Down: {getTotalVotesbyType(poll.id, false)}
              </div>
              <Authenticated>
                <div className="vote-btns">
                  <i
                    class="bi bi-hand-thumbs-up vote-btn"
                    onClick={() => handleVote(poll.id, true)}
                  ></i>
                  <i
                    class="bi bi-hand-thumbs-down vote-btn"
                    onClick={() => handleVote(poll.id, false)}
                  ></i>
                </div>
              </Authenticated>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default MainPage;
