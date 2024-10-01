import './index.css';
import Header from '../Mainpage/components/Header';
import CardComponent from './components/CardComponent';
import { useEffect, useState } from 'react';
import { Flex } from 'antd';

function Pollinfo() {
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
      <Flex align="center" justify="center" gap="middle" vertical>
        {data[0] && <CardComponent key={0} itemData={data[0]}></CardComponent>}
      </Flex>
    </>
  );
}

export default Pollinfo;
