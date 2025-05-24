import { Howl } from 'howler';
import AudioProgressBar from './AudioProgressBar';
import AudioTime from './AudioTime';
import PlayPauseButton from './PlayPauseButton';
import VolumeControl from './VolumeControl';
import { useMemo } from 'react';
import styles from './Audioplayer.module.css';
import VolumeSlider from './VolumeSlider';
import Settings from './Settings';

export default function AudioPlayer(props) {
  const service = useMemo(() => {
    const sound = new Howl({
      src: [props.src],
    });

    return sound;
  }, []);

  return (
    <div className={styles.container}>
      <div>
        <PlayPauseButton service={service} />
      </div>
      <div>
        <AudioProgressBar service={service} />
      </div>
      <div>
        <AudioTime service={service} />
      </div>
      <div>
        <VolumeControl service={service} />
      </div>
      <div>
        <VolumeSlider service={service} />
      </div>
      <div>
        <Settings service={service} />
      </div>
    </div>
  );
}
