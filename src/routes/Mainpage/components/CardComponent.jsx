import { Card, Image, Space, Flex, Avatar, Slider } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Typography, Divider, Button } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

let fill = 1;

function CardComponent(props) {
  const [buttonClass, setButtonClass] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [timer, setTimer] = useState(null);
  const key = props.key;
  const question = props.itemData.question;
  const image = props.itemData.image;
  const video = props.itemData.video;
  const yesVotes = props.itemData.votes_yes;
  const noVotes = props.itemData.votes_no;

  function onMouseDown() {
    setIsPressed(true);
    setTimer(
      setInterval(() => {
        fill += 1;
        console.log('testing');
        setButtonClass(`vote-btn-hold-${fill}`);

        if (fill >= 10) {
          setButtonClass(`vote-btn-hold-10`);
        }
      }, 100)
    );
  }

  function onMouseLeave() {
    setIsPressed(false);
    fill = 0;
    clearInterval(timer); // Clear the timer on mouse up
  }

  useEffect(() => {
    return () => {
      // Cleanup the timer on component unmount
      if (timer) clearInterval(timer);
    };
  }, [timer]);
  return (
    <>
      <Card
        style={{
          width: '90%',
          maxWidth: 600,
          backgroundColor: 'white',
          borderColor: 'white',
          color: 'white',
        }}
      >
        <Flex justify="space-between">
          <div>
            <Flex gap="10px">
              <Avatar
                size="large"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              />
              <div>
                <b className="profile-name">Tyson Le</b>
              </div>
              <div className="hour-text">1 Hour Ago</div>
            </Flex>
          </div>
          <i class="bi bi-share-fill"></i>
        </Flex>
        <Divider style={{ margin: '10px' }}></Divider>
        <Typography.Title
          level={3}
          style={{
            color: 'black',
            marginTop: '12px',
          }}
        >
          {question}
        </Typography.Title>
        <div className="space"></div>
        {image ? (
          <Image width="100%" src={image} style={{ borderRadius: '10px' }} />
        ) : (
          <iframe
            width="100%"
            height="300px"
            src={video}
            title="YouTube video player"
            style={{ border: 0, borderRadius: '10px' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <div className="space"></div>
        <Flex justify="flex-end" gap="middle">
          <div className="grey-text">19 Comments</div>
          <div className="grey-text">10 Shares</div>
        </Flex>
        <div className="space"></div>
        <Flex justify="space-around">
          <div
            className={`${buttonClass} vote-btn ${isPressed ? 'pressed' : ''}`}
            onMouseDown={onMouseDown}
            onPointerDown={onMouseDown}
            onMouseUp={onMouseLeave}
            onMouseLeave={onMouseLeave}
          >
            Vote Me!
          </div>

          {/* <span className="vote-icon-circle">
            <i className="bi bi-hand-thumbs-up vote-icon"></i>
          </span>
          <span className="vote-icon-circle">
            <i className="bi bi-hand-thumbs-down vote-icon"></i>
          </span> */}
        </Flex>
        <Slider defaultValue={50} />
        <div className="space"></div>
        <Flex justify="center">
          <Button
            href="/pollinfo"
            size="large"
            className="poll-info-btn"
            type="primary"
          >
            Poll Info
          </Button>
        </Flex>
      </Card>
    </>
  );
}

export default CardComponent;
