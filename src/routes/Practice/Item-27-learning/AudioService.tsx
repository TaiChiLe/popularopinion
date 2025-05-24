import { Howl } from 'howler';

type Options = {
  src: string;
};

export enum AudioState {
  Playing = 'playing',
  Paused = 'paused',
  Stopped = 'stopped',
}

// inside the class create a private timer
// when play event is requested, start the timer that will ticked every 100ms
// in there , keep triggering notifyChanged();
// when stop or paused event is requested, stop the timer and destroy it

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

    this.sound.on('mute', () => {});
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

  getTime() {
    return this.sound.seek();
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
