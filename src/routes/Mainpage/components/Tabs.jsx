import { Flex } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

function Tabs() {
  return (
    <>
      <Flex
        className="tabs-wrapper"
        style={{ marginTop: '20px' }}
        align="center"
        justify="space-around"
      >
        <div className="tab active">
          <i className="bi bi-star"></i>Hot
        </div>
        <div className="tab">
          <i className="bi bi-hand-thumbs-up"></i>Best
        </div>
        <div className="tab">
          <i className="bi bi-hand-thumbs-down"></i>Worst
        </div>
      </Flex>
    </>
  );
}

export default Tabs;
