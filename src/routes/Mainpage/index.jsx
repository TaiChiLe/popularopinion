import './index.css';
import Header from './components/Header';
import Tabs from './components/Tabs';
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
      <Tabs></Tabs>
      <div className="space"></div>
      {data && (
        <Flex align="center" justify="center" gap="middle" vertical>
          {data.map((item, index) => (
            <CardComponent key={index} itemData={item}></CardComponent>
          ))}
        </Flex>
      )}
    </>
  );
}

export default Mainpage;
