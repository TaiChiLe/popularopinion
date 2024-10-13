import { Card, Image, Space, Flex, Avatar } from 'antd';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Typography, Divider, Button } from 'antd';
import { useState } from 'react';
import { Chart } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function CardComponent(props) {
  const [userData, setUserData] = useState(null);
  const key = props.key;
  const question = props.itemData.question;
  const image = props.itemData.image;
  const video = props.itemData.video;
  const yesVotes = props.itemData.votes_yes;
  const noVotes = props.itemData.votes_no;

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
            color: 'white',
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
        <Flex justify="space-around">
          <span className="vote-icon-circle">
            <i className="bi bi-hand-thumbs-up vote-icon"></i>
          </span>
          <span className="vote-icon-circle">
            <i className="bi bi-hand-thumbs-down vote-icon"></i>
          </span>
        </Flex>
        <div className="space"></div>

        <Bar
          data={{
            labels: [
              'Australia',
              'United States',
              'Vietnam',
              'United States',
              'Vietnam',
              'United States',
              'Vietnam',
              'testests',
              'testste',
            ],
            datasets: [
              {
                label: 'Yes Votes',
                data: [100, 200, 300, 200, 150, 120, 20, 30, 40],
                backgroundColor: ['green'],
                borderRadius: '10',
              },
              {
                label: 'No Votes',
                data: [120, 230, 140, 230, 50, 20, 120, 330, 140],
                backgroundColor: ['red'],
                borderRadius: '10',
              },
            ],
          }}
          // options={{
          //   indexAxis: 'y',
          // }}
        />
        <Divider></Divider>
        <Avatar
          className="Comment-avatar"
          size="large"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
        <div className="Comment">
          <div className="Comment-Author">Tyson Le</div>Pepsi is awesome, I love
          pepsi!
        </div>
        <Avatar
          className="Comment-avatar"
          size="large"
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
        />
        <div className="Comment">
          <div className="Comment-Author">Tran Nguyen</div>I can drink pepsi all
          day long! This is some very long text
          sadfsdfsdfsdfsdfsdfssdfsdfsdfasdasdasdasd
        </div>
        <Avatar
          className="Comment-avatar"
          size="large"
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=0"
        />
        <div className="Comment">
          <div className="Comment-Author">Aries Hoang</div>Sugar High All Day!
        </div>
      </Card>
    </>
  );
}

export default CardComponent;
