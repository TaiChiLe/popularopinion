import './index.css';
import Header from '../Mainpage/components/Header';
import Footer from '../Mainpage/components/Footer';
import Info from './components/Info';
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
      <div className="space"></div>
      <Footer></Footer>
    </>
  );
}

export default ProfileSettings;
