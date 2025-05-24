import { Slider } from 'antd';
import type { SliderSingleProps } from 'antd';
import styles from './AudioProgressbar.module.css';
import { useEffect, useState } from 'react';
import ConvertSecondsToTimer from './ConvertSecondsToTimer';

export default function AudioProgressBar(props) {
  const { service } = props;
  const [playPosition, setPlayPosition] = useState(service.seek());
  const soundDurationInSeconds = service.duration();

  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (
    value
  ) => ConvertSecondsToTimer(value);

  const onSeekChange = (value) => {
    setPlayPosition(service.seek(value));
  };

  useEffect(() => {
    const updateSeekBar = () => {
      if (service.playing()) {
        setPlayPosition(service.seek());
      }
    };

    const interval = setInterval(updateSeekBar, 500); // Update every 500ms

    return () => clearInterval(interval);
  }, [service]);

  return (
    <>
      <Slider
        max={soundDurationInSeconds}
        tooltip={{ formatter }}
        step={1}
        className={styles.trackBar}
        value={playPosition}
        onChange={onSeekChange}
      />
    </>
  );
}
