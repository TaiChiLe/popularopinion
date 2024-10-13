import './index.css';
import Header from './components/Header';
import CommentsFooter from './components/CommentsFooter';
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
      <div className="header-space"></div>
      <Header></Header>
      <div className="main-content-container-pollinfo">
        <Flex align="center" justify="center" gap="middle" vertical>
          {data[0] && (
            <CardComponent key={0} itemData={data[0]}></CardComponent>
          )}
        </Flex>
      </div>
      <CommentsFooter></CommentsFooter>
    </>
  );
}

export default Pollinfo;
