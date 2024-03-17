import React from 'react';
// import videojs from 'video.js';

// This imports the functional component from the previous sample.
import VideoJS from '../VideoJS/Video'

export const MoviePlay = () => {
  const playerRef = React.useRef(null);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
        src: "/manifests/example_854x480.m3u8",
        type: "application/x-mpegURL"
    }]
  };

  return (
    <>
      <VideoJS options={videoJsOptions}  />
    </>
  );
}

export default MoviePlay;