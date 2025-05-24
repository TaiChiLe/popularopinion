import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AudioService, AudioState } from '../AudioService';
import { AudioPlayerControls } from './AudioPlayerControls';

type AudioPlayerProps = {
  src: string;
};

type ContextValue = {
  audioService: AudioService;
  info: {
    state: AudioState;
  };
};

const AudioPlayerContext = createContext<ContextValue | undefined>(undefined);

export function useAudioPlayer(): ContextValue {
  const context = useContext(AudioPlayerContext);

  return context!;
}

export default function AudioPlayer(props: AudioPlayerProps) {
  const audioService = useMemo(() => {
    return new AudioService({
      src: props.src,
    });
  }, [props.src]);

  const [info, setInfo] = useState({
    state: AudioState.Stopped,
  });

  useEffect(() => {
    audioService.subscribe((newState?: AudioState) => {
      setInfo((prevInfo) => ({
        state: newState || prevInfo.state,
      }));
    });
  }, []);

  return (
    <AudioPlayerContext.Provider value={{ audioService, info }}>
      <div>
        <AudioPlayerControls />
      </div>
    </AudioPlayerContext.Provider>
  );
}
