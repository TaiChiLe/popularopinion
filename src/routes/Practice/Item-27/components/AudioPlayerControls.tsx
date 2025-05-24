import { Button, Slider } from 'antd';
import { useAudioPlayer } from './AudioPlayer';
import { AudioState } from '../AudioService';
import ConvertSecondsToTimer from './ConvertSecondsToTimer';
import type { SliderSingleProps } from 'antd';

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
  const { audioService, info } = useAudioPlayer();
  const { state } = info;

  const onClick = () => {
    if (state === AudioState.Muted) {
      audioService.unmute();
    } else {
      audioService.mute();
    }
  };
  return (
    <Button onClick={onClick}>
      {state === AudioState.Muted ? 'Unmute' : 'Mute'}
    </Button>
  );
}

export function Time() {
  const { audioService } = useAudioPlayer();

  return (
    <div>
      {ConvertSecondsToTimer(Math.floor(audioService.getTime()))} /{' '}
      {ConvertSecondsToTimer(Math.floor(audioService.getDuration()))}
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

export function SeekSlider() {
  const { audioService } = useAudioPlayer();
  const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (
    value
  ) => ConvertSecondsToTimer(value);

  const onSeekChange = (value: number) => {
    audioService.setTime(value);
  };

  return (
    <>
      <Slider
        max={audioService.getDuration()}
        tooltip={{ formatter }}
        step={1}
        value={audioService.getTime()}
        onChange={onSeekChange}
      />
    </>
  );
}

export function AudioPlayerControls() {
  return (
    <div>
      <PlayPauseButton />
      <Mute />
      <Time />
      <SeekSlider />
      <VolumeSlider />
    </div>
  );
}
