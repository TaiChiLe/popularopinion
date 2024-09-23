import { Flex } from 'antd';
import { Typography } from 'antd';
const { Title } = Typography;

function Header() {
  return (
    <>
      <Flex align="center" justify="space-around">
        <div>
          <Title style={{ color: 'white' }}>Popular Opinion</Title>
        </div>
        <div>
          <i class="bi bi-bell"></i>
        </div>
      </Flex>
    </>
  );
}

export default Header;
