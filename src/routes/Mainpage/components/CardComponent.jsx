import { Card, Image, Space, Flex } from 'antd';

function CardComponent(props) {
  const key = props.key;
  const question = props.itemData.question;
  const image = props.itemData.image;
  const video = props.itemData.video;
  const yesVotes = props.itemData.votes_yes;
  const noVotes = props.itemData.votes_no;

  return (
    <>
      <Card
        title={question}
        style={{
          width: '90%',
          maxWidth: 600,
          backgroundColor: '#bf684d',
          borderColor: '#bf684d',
          color: 'white',
        }}
      >
        {image ? (
          <Image width="100%" src={image} style={{ borderRadius: '10px' }} />
        ) : (
          <iframe
            width="100%"
            height="300px"
            src={video}
            title="YouTube video player"
            style={{ border: 0, borderRadius: '10px' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <Flex justify="space-around">
          <span className="vote-icon-circle">
            <i className="bi bi-hand-thumbs-up vote-icon"></i>
          </span>
          <span className="vote-icon-circle">
            <i className="bi bi-hand-thumbs-down vote-icon"></i>
          </span>
        </Flex>
      </Card>
    </>
  );
}

export default CardComponent;
