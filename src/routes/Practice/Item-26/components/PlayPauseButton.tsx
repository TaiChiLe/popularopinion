import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

export default function PlayPauseButton(props) {
  const { service } = props;
  const [playing, setPlaying] = useState(service.playing());
  const playSound = () => {
    service.play();
    setPlaying(true);
  };
  const pauseSound = () => {
    service.pause();
    setPlaying(false);
  };

  // Talk with OpenAi to see how to update your React component when using
  // Howl

  return (
    <>
      {!playing && <CaretRightOutlined onClick={playSound} />}
      {playing && <PauseOutlined onClick={pauseSound} />}
    </>
  );
}
