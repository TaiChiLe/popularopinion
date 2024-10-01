import './index.css';
import Header from './components/Header';
import Info from './components/Info';
import ProfileData from './components/ProfileData';
import CardComponent from './components/CardComponent';
import { Divider, Flex } from 'antd';
import { useEffect, useState } from 'react';

function ProfileSettings() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const response = await fetch('votingdata.json');
    setData(await response.json());
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Header></Header>
      <div className="space"></div>
      <Info></Info>
      <Divider></Divider>
      <ProfileData></ProfileData>
      <div className="space"></div>
      <Flex align="center" justify="center" gap="middle" vertical>
        {data.map((item, index) => (
          <CardComponent key={index} itemData={item}></CardComponent>
        ))}
      </Flex>
    </>
  );
}

export default ProfileSettings;
