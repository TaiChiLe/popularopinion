import './index.css';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Footer from './components/Footer';
import CardComponent from './components/CardComponent';
import { useEffect, useState } from 'react';
import { Space, Flex } from 'antd';
import { Col, Row } from 'antd';

function Mainpage() {
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
      <div className="main-content-container">
        <Tabs></Tabs>
        <div className="space"></div>
        {data && (
          <Flex align="center" justify="center" gap="middle" vertical>
            {data.map((item, index) => (
              <CardComponent key={index} itemData={item}></CardComponent>
            ))}
          </Flex>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default Mainpage;
