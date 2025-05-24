import { Howl } from 'howler';

type Options = {
  src: string;
};

export enum AudioState {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped',
  Muted = 'muted',
  Unmuted = 'unmuted',
}

export class AudioService {
  private sound: Howl;
  private internalCallback: any;
  private timer;

  constructor(options: Options) {
    this.sound = new Howl({ src: options.src });

    this.sound.on('play', () => {
      this.notifyChanged(AudioState.Playing);

      this.timer = setInterval(() => {
        this.notifyChanged(AudioState.Playing);
      }, 100);
    });

    this.sound.on('pause', () => {
      this.notifyChanged(AudioState.Paused);
      clearInterval(this.timer);
    });

    this.sound.on('stop', () => {
      this.notifyChanged(AudioState.Stopped);
      clearInterval(this.timer);
    });

    this.sound.on('volume', () => {
      this.notifyChanged();
    });

    this.sound.on('mute', () => {
      this.notifyChanged(AudioState.Muted);
    });
  }

  play() {
    this.sound.play();
  }

  pause() {
    this.sound.pause();
  }

  stop() {
    this.sound.stop();
  }

  getVolume() {
    return this.sound.volume();
  }

  setVolume(value: number) {
    this.sound.volume(value);
  }

  mute() {
    this.sound.mute(true);
  }

  unmute() {
    this.sound.mute(false);
  }

  getTime() {
    return this.sound.seek();
  }

  setTime(value: number) {
    this.sound.seek(value);
  }

  getDuration() {
    return this.sound.duration();
  }

  subscribe(callback: any) {
    this.internalCallback = callback;
  }

  notifyChanged(newState?: AudioState) {
    this.internalCallback(newState);
  }
}
