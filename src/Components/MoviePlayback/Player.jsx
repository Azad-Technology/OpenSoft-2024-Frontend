// import '@vidstack/react/player/styles/default/theme.css';
// import '@vidstack/react/player/styles/default/layouts/video.css';
// import { MediaPlayer, MediaProvider } from '@vidstack/react';
// import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
// import React, { useState } from 'react';
// // import './styles.css';

// function Modal({ onClose }) {
//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         {/* Video container */}
//         <div className="video-container">
//           <div className='video'>
//             <MediaPlayer title="Dune" src="/manifests/dune_master.m3u8">
//               <MediaProvider />
//               <DefaultVideoLayout icons={defaultLayoutIcons} />
//             </MediaPlayer>
//           </div>
//         </div>
//         {/* Close button */}
//         <button className="close-button" onClick={onClose}>X</button>
//       </div>
//     </div>
//   );
// }
// function Player() {
//   const [showModal, setShowModal] = useState(false);
//   return (
//     <>
//       <div className="app">
//         <button onClick={() => setShowModal(true)}>Open Modal</button>
//         {showModal && <Modal onClose={() => setShowModal(false)} />}
//       </div>
//     </>
//   )
// }

// export default Player