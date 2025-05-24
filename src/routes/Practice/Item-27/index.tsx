import styles from './index.module.css';
import AudioPlayer from './components/AudioPlayer';
import SiriWave from 'siriwave';
import { useRef } from 'react';

export default function Item27() {
  return (
    <div className={styles.container}>
      <AudioPlayer src="https://howlerjs.com/assets/howler.js/examples/player/audio/80s_vibe.webm" />
    </div>
  );
}
