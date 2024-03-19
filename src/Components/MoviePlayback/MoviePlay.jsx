import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';

export const MoviePlay = () => {
  return (
    <div >
        <MediaPlayer title="Sprite Fight" src="/mainifests/dune_master.m3u8">
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
        </MediaPlayer>
    </div>
  )
}