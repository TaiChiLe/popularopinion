import { Button, Slider } from 'antd';
import { useAudioPlayer } from './AudioPlayer';
import { AudioState } from '../AudioService';

export function PlayPauseButton() {
  const { audioService, info } = useAudioPlayer();
  const { state } = info;

  const onClick = () => {
    if (state === AudioState.Playing) {
      audioService.pause();
    } else {
      audioService.play();
    }
  };

  return (
    <Button onClick={onClick}>
      {state === AudioState.Playing ? 'Pause' : 'Play'}
    </Button>
  );
}

export function Mute() {
  const { audioService } = useAudioPlayer();

  return <Button>Mute</Button>;
}

export function Time() {
  const { audioService } = useAudioPlayer();

  return (
    <div>
      {audioService.getTime()} / {audioService.getDuration()}
    </div>
  );
}

export function VolumeSlider() {
  const { audioService } = useAudioPlayer();
  const onChange = (value: number) => {
    audioService.setVolume(value);
  };

  return (
    <Slider
      value={audioService.getVolume()}
      min={0}
      max={1}
      step={0.1}
      onChange={onChange}
    />
  );
}

export function AudioPlayerControls() {
  return (
    <div>
      <PlayPauseButton />
      <Mute />
      <Time />
      <VolumeSlider />
    </div>
  );
}
