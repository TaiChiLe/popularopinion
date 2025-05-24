import { Slider } from 'antd';
import styles from './VolumeSlider.module.css';

export default function VolumeSlider(props) {
  const { service } = props;
  const onVolumeChange = (value: number) => {
    service.volume(value / 100);
  };
  return (
    <Slider
      className={styles.volumeBar}
      defaultValue={100}
      onChange={onVolumeChange}
    />
  );
}
