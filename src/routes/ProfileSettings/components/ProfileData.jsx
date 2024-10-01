import { Flex } from 'antd';

function ProfileData() {
  return (
    <>
      <Flex horizontal align="center" justify="space-around">
        <div className="data-container">Posts 78</div>
        <div className="data-container">Points 120</div>
      </Flex>
    </>
  );
}

export default ProfileData;
