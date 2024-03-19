import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

function Player() {

    return (
      <>
        <MediaPlayer title="Dune" src="/manifests/dune_master.m3u8">
          <MediaProvider />
          <DefaultVideoLayout  icons={defaultLayoutIcons} />
        </MediaPlayer>
      </>
    )
  }
  
  export default Player