import { useEffect, useState } from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import './Index.css';
import supabase from '../../utils/supabase';
import { isFormElement } from 'react-router-dom/dist/dom';
import { Authenticated } from '../../Components/Authenticated';
import { Image } from 'antd';

function MainPage() {
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);
  const backgroundUrl =
    'https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D';

  useEffect(() => {
    async function fetchData() {
      const { data: pollsData } = await supabase.from('polls').select();
      const { data: votesData } = await supabase.from('votes').select();

      if (pollsData) setPolls(pollsData);
      if (votesData) setVotes(votesData);
    }

    async function fetchUserId() {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData?.session);
      setUserId(sessionData.session.user.id);
    }

    fetchData();
    fetchUserId();
  }, []);

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

  async function handleVote(vote_id, vote_choice) {
    if (!userId) {
      console.error('User is not logged in.');
      return;
    }

    const voteData = {
      votes_user_id: userId,
      votes_id: vote_id,
      votes_choice: vote_choice,
    };

    const { error } = await supabase.rpc('upsert_votes', voteData);

    if (error) {
      console.error('Error upserting vote:', error);
    } else {
      const { data: updatedVotes } = await supabase.from('votes').select();
      if (updatedVotes) setVotes(updatedVotes);
    }
  }

  // Function to check if a URL is a YouTube link and return its embed URL
  function getYouTubeEmbedUrl(url) {
    if (!url) {
      return null;
    }
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return null;
  }

  return (
    <Authenticated>
      <Header />
      <div className="main-page-container">
        {polls.map((poll) => {
          const youTubeEmbedUrl = getYouTubeEmbedUrl(poll.url);
          return (
            <div className="post" key={poll.id}>
              {youTubeEmbedUrl ? (
                <iframe
                  width="100%"
                  height="300px"
                  src={youTubeEmbedUrl}
                  frameBorder="0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                // <div
                //   className="post-background"
                //   style={{
                //     backgroundImage: `url(${poll.url || backgroundUrl})`,
                //   }}
                // >
                <div>
                  <Image
                    className="post-background"
                    preview={false}
                    src={`${poll.url || backgroundUrl}`}
                  ></Image>
                  <div className="post-question">{poll.question}</div>
                </div>
              )}
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
                <div className="vote-btns">
                  <i
                    className="bi bi-hand-thumbs-up vote-btn"
                    onClick={() => handleVote(poll.id, true)}
                  ></i>
                  <i
                    className="bi bi-hand-thumbs-down vote-btn"
                    onClick={() => handleVote(poll.id, false)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </Authenticated>
  );
}

export default MainPage;
