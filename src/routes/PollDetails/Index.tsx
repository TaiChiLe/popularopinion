import { useParams } from 'react-router-dom';
import { Authenticated } from '../../Components/Authenticated';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import { useEffect, useState } from 'react';
import supabase from '../../utils/supabase';
import { Button, Image, notification } from 'antd';
import './index.css';

export function PollDetails(props) {
  let { id } = useParams();

  if (props.id) {
    id = props.id;
  }
  const [polls, setPolls] = useState([]);
  const [votes, setVotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);
  const [pollOptions, setPollOptions] = useState([]);
  const [api, contextholder] = notification.useNotification();

  const backgroundUrl =
    'https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D';
  console.log('ID is', id);

  useEffect(() => {
    async function fetchData() {
      const { data: pollsData } = await supabase
        .from('polls')
        .select()
        .eq('id', id);
      const { data: votesData } = await supabase
        .from('votes')
        .select()
        .eq('poll_id', id);
      const { data: pollOptions } = await supabase
        .from('poll_options')
        .select()
        .eq('poll_id', id);

      if (pollsData) setPolls(pollsData);
      if (votesData) setVotes(votesData);
      if (pollOptions) setPollOptions(pollOptions);

      console.log('PollsData', pollsData);
      console.log('VotesData', votesData);
      console.log('pollOptions', pollOptions);

      if (pollOptions?.length == 0) {
        setPollOptions(null);
      }
    }

    async function fetchUserId() {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData?.session);
      setUserId(sessionData.session.user.id);
    }

    fetchUserId();

    fetchData();
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
    const voteData = {
      votes_user_id: userId,
      votes_id: vote_id,
      votes_choice: vote_choice,
    };

    const { error } = await supabase.rpc('upsert_votes', voteData);

    if (error) {
      console.error('Error upserting vote:', error);
      api.open({
        type: 'error',
        message: 'Vote Failed',
      });
    } else {
      const { data: updatedVotes } = await supabase.from('votes').select();
      if (updatedVotes) setVotes(updatedVotes);
      api.open({
        type: 'success',
        message: 'Vote Successful',
      });
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

  async function handleMultiVote(votedOptionId) {
    console.log(votedOptionId);
    const voteData = {
      votes_user_id: userId,
      votes_id: id,
      option_id: votedOptionId,
    };

    console.log('VotesDate', voteData);

    const { error } = await supabase.rpc('upsert_multi_votes', voteData);

    if (error) {
      console.error('Error upserting vote:', error);
      api.open({
        type: 'error',
        message: 'Vote Failed',
      });
    } else {
      const { data: updatedVotes } = await supabase.from('votes').select();
      if (updatedVotes) setVotes(updatedVotes);
      api.open({
        type: 'success',
        message: 'Vote Successful',
      });
    }
  }

  return (
    <Authenticated>
      {contextholder}
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

              {pollOptions ? (
                <></>
              ) : (
                <>
                  <div className="vote-results">
                    Current Votes Up: {getTotalVotesbyType(poll.id, true)}
                  </div>
                  <div className="vote-results">
                    Current Votes Down: {getTotalVotesbyType(poll.id, false)}
                  </div>
                </>
              )}

              {pollOptions ? (
                <div className="poll-option-btn-wrapper">
                  {pollOptions.map((options) => (
                    <Button onClick={() => handleMultiVote(options.id)}>
                      {options.option_text}
                    </Button>
                  ))}
                </div>
              ) : (
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
              )}
            </div>
          </div>
        );
      })}
    </Authenticated>
  );
}
