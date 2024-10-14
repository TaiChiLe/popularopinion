import { Avatar, Flex, Row, Col } from 'antd';

function Info() {
  return (
    <>
      <div className="info-wrapper">
        <div className="settings-headings">Photo</div>
        <Flex horizontal align="center" justify="space-around">
          <div>
            <Avatar
              className="avatar-profile"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </div>
          <div>
            <Flex
              className="flex-xl-gap"
              horizontal
              align="center"
              justify="space-around"
            >
              <div>Delete</div>
              <div>Upload</div>
            </Flex>
          </div>
        </Flex>
        <div className="space"></div>
        <div className="settings-headings">Name</div>
        <div className="space"></div>

        <Row>
          <Col span={8} offset={2}>
            <div className="settings-details">Tyson Le</div>
          </Col>
          <Col span={6} offset={8}>
            <div>Edit</div>
          </Col>
        </Row>

        <div className="space"></div>
        <div className="settings-headings">Nickname</div>
        <div className="space"></div>
        <Row>
          <Col span={8} offset={2}>
            <div className="settings-details">IronMadt</div>
          </Col>
          <Col span={6} offset={8}>
            <div>Edit</div>
          </Col>
        </Row>
        <div className="space"></div>
        <div className="settings-headings">Bio</div>
        <div className="space"></div>
        <Row>
          <Col span={8} offset={2}>
            <div className="settings-details">
              Hi!, I'm Tyson, I love food and games blah blah blah
            </div>
          </Col>
          <Col span={6} offset={8}>
            <div>Edit</div>
          </Col>
        </Row>
        <div className="space"></div>
        <div className="settings-headings">Year of Birth</div>
        <div className="space"></div>
        <Row>
          <Col span={8} offset={2}>
            <div className="settings-details">1990</div>
          </Col>
          <Col span={6} offset={8}>
            <div>Edit</div>
          </Col>
        </Row>
        <div className="space"></div>
        <div className="settings-headings">Location</div>
        <div className="space"></div>
        <Row>
          <Col span={8} offset={2}>
            <div className="settings-details">Australia</div>
          </Col>
          <Col span={6} offset={8}>
            <div>Edit</div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Info;
