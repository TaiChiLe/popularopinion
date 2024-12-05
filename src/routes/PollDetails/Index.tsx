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
  const [posts, setposts] = useState([]);
  const [votes, setVotes] = useState([]);
  const [userId, setUserId] = useState(null);
  const [session, setSession] = useState(null);
  const [postMetadata, setPostMetadata] = useState([]);
  const [api, contextholder] = notification.useNotification();
  let single_vote: boolean = false;

  const backgroundUrl =
    'https://plus.unsplash.com/premium_photo-1672201106204-58e9af7a2888?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JhZGllbnR8ZW58MHx8MHx8fDA%3D';
  console.log('ID is', id);

  useEffect(() => {
    async function fetchData() {
      const { data: postsData } = await supabase
        .from('posts')
        .select()
        .eq('id', id);
      const { data: votesData } = await supabase
        .from('votes')
        .select()
        .eq('post_id', id);
      const { data: postMetadata } = await supabase
        .from('post_metadata')
        .select()
        .eq('post_id', id);

      if (postsData) setposts(postsData);
      if (votesData) setVotes(votesData);
      if (postMetadata) setPostMetadata(postMetadata);

      console.log('postsData', postsData);
      console.log('VotesData', votesData);
      console.log('postMedata', postMetadata);

      if (postsData[0].type === 'single-vote') {
        single_vote = true;
        console.log('SingleVote', single_vote);
      } else {
        console.log('SingleVote', single_vote);
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

  async function handleVote(vote_id, vote_choice) {
    //First check if vote already exists
    const { data } = await supabase
      .from('votes')
      .select()
      .eq('user_id', userId);
    let voteExists = false;
    let totalVotes = postMetadata[0].vote_count;
    let currentVote;

    console.log('total votes', totalVotes);
    let metadata = {};
    if (data?.length != 0) {
      voteExists = true;
      console.log('Vote Exists for user', data);
      //check what vote user has currently

      if (data[0].data.choice === 'yes') {
        currentVote = true;
        console.log('CurrentVote = Yes');
      } else {
        currentVote = false;
        console.log('CurrentVote = No');
      }

      //if current vote and new vote don't match set metadata
      if (currentVote != vote_choice) {
        console.log("Current vote doesn't match new vote");
        if (vote_choice) {
          metadata = {
            no_votes: postMetadata[0].metadata.no_votes - 1,
            yes_votes: postMetadata[0].metadata.yes_votes + 1,
          };
        } else {
          metadata = {
            no_votes: postMetadata[0].metadata.no_votes + 1,
            yes_votes: postMetadata[0].metadata.yes_votes - 1,
          };
        }
      } else {
        console.log('Current vote matches new vote');
        metadata = {
          no_votes: postMetadata[0].metadata.no_votes,
          yes_votes: postMetadata[0].metadata.yes_votes,
        };
      }
    } else {
      //Vote does not exist for user
      console.log('Vote Does Not Exist for user', data);
      currentVote = vote_choice;
      totalVotes++;
      if (vote_choice) {
        metadata = {
          no_votes: postMetadata[0].metadata.no_votes,
          yes_votes: postMetadata[0].metadata.yes_votes + 1,
        };
      } else {
        metadata = {
          no_votes: postMetadata[0].metadata.no_votes + 1,
          yes_votes: postMetadata[0].metadata.yes_votes,
        };
      }
    }

    const { error } = await supabase.rpc('upsert_post_metadata', {
      meta_count: totalVotes,
      meta_data: metadata,
      meta_post_id: vote_id,
    });

    if (currentVote != vote_choice) {
      console.log("Current vote doesn't match new vote");
      let votes_data = {};
      if (vote_choice) {
        votes_data = {
          choice: 'yes',
        };
      } else {
        votes_data = {
          choice: 'no',
        };
      }
      const { error: error2 } = await supabase.rpc('upsert_votes', {
        votes_data: votes_data,
        votes_post_id: vote_id,
        votes_user_id: userId,
      });

      if (error2) {
        console.error('Error upserting vote:', error2);
        api.open({
          type: 'error',
          message: 'Vote Failed',
        });
      } else {
        const { data: postMetadata } = await supabase
          .from('post_metadata')
          .select()
          .eq('post_id', id);
        if (postMetadata) setPostMetadata(postMetadata);
        api.open({
          type: 'success',
          message: 'Vote Successful',
        });
      }
    }

    if (error) {
      console.error('Error upserting vote:', error);
      api.open({
        type: 'error',
        message: 'Vote Failed',
      });
    } else {
      const { data: postMetadata } = await supabase
        .from('post_metadata')
        .select()
        .eq('post_id', id);
      if (postMetadata) setPostMetadata(postMetadata);
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
      {posts.map((poll) => {
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
                  src={`${poll.settings.image_url || backgroundUrl}`}
                ></Image>
                <div className="post-question">{poll.title}</div>
              </div>
            )}
            <div>
              <div className="vote-results">
                Current Votes Total: {postMetadata[0].vote_count}
              </div>

              {single_vote ? (
                <></>
              ) : (
                <>
                  <div className="vote-results">
                    Current Votes Up: {postMetadata[0].metadata.yes_votes}
                  </div>
                  <div className="vote-results">
                    Current Votes Down: {postMetadata[0].metadata.no_votes}
                  </div>
                </>
              )}

              {single_vote ? (
                <div className="poll-option-btn-wrapper">
                  {postMetadata.map((options) => (
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
