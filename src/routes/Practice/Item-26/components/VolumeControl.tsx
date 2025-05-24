import { CloseOutlined, MutedFilled } from '@ant-design/icons';
import { useState } from 'react';

export default function VolumeControl(props) {
  const service = props.service;
  const [muted, setMuted] = useState(false);
  const muteSound = () => {
    service.mute(!muted);
    setMuted(!muted);
  };

  return (
    <>
      <MutedFilled onClick={muteSound} />
      {muted && <CloseOutlined />}
    </>
  );
}
