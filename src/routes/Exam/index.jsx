import Progress from './components/Progress';
import Info from './components/Info';
import Instructions from './components/Instructions';
import './index.css';
import { Flex } from 'antd';
import { Divider } from 'antd';

function Exam() {
  return (
    <>
      <Progress></Progress>
      <Info></Info>
      <Divider />
      <Instructions></Instructions>
    </>
  );
}

export default Exam;
