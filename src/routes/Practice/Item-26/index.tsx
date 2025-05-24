import AudioPlayer from './components/AudioPlayer';

// Usage
// <AudioPlayer src="..." play={false} />

export default function Item26() {
  // this has to be useMemo
  // how can you sync between the service and UI
  // so the information of the progressbar or

  return (
    <div>
      <AudioPlayer src="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3" />
    </div>
  );
}
