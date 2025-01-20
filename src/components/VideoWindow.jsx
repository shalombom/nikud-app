import React, { useRef, useEffect } from 'react';
import '../styles/video-window.css';

export default function VideoWindow({ videoSrc, onEnded, style, isPlaying, freezeTime, ...props }) {
  const videoRef = useRef(null);
  const hasPlayed = useRef(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    
    if (isPlaying) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      document.querySelectorAll('video').forEach(v => {
        if (v !== video) {
          v.pause();
          v.currentTime = 0;
        }
      });
      
      video.currentTime = 0;
      video.style.transition = 'none';
      video.style.opacity = '1';
      video.play();
    } else {
      video.pause();
      video.currentTime = 0;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [videoSrc, isPlaying]);

  const handleEnded = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.style.transition = 'opacity 1s ease-out';
      onEnded && onEnded(timeoutRef);
    }
  };

  return (
    <div 
      className="video-window"
      style={{
        position: 'relative',
        width: '372px',
        height: '372px',
        ...style
      }}
      {...props}
    >
      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 1
          }}
          onEnded={handleEnded}
          playsInline
        />
      )}
    </div>
  );
} 