import { useEffect, useState } from 'react';
import ConvertSecondsToTimer from './ConvertSecondsToTimer';

export default function AudioTime(props) {
  const service = props.service;
  const [soundDurationLeft, setSoundDurationLeft] = useState('');

  useEffect(() => {
    const updateTimeLeft = () => {
      setSoundDurationLeft(
        ConvertSecondsToTimer(service.duration() - service.seek())
      );
    };

    const interval = setInterval(updateTimeLeft, 500);

    return () => clearInterval(interval);
  }, service);

  return <>{soundDurationLeft && `-${soundDurationLeft}`}</>;
}
