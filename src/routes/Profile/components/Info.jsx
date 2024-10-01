import { Avatar, Flex } from 'antd';

function Info() {
  return (
    <>
      <Flex horizontal align="center" justify="space-around">
        <div>
          <Avatar
            className="avatar-profile"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </div>
        <div>
          <div className="name-title">Tyson Le</div>
          <div className="space-small"></div>
          <div>@IronMadt</div>
          <div className="space-small"></div>
          <div>Hi! I'm Tyson, I love food and games and blah blah blah</div>
          <div className="space-small"></div>
          <div>
            <b>2K Followers 21 Following</b>
          </div>
        </div>
      </Flex>
    </>
  );
}

export default Info;
