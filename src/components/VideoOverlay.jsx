import React from 'react';

export default function VideoOverlay({ videoSrc }) {
  if (!videoSrc) return null;
  
  return (
    <div className="video-overlay">
      <div className="video-container">
        <video
          src={videoSrc}
          autoPlay
          controls
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            borderRadius: '8px'
          }}
        />
      </div>
    </div>
  );
} 