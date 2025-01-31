import { useState, useEffect } from 'react';
import NikudTile from './components/NikudTile'
import Kamatz from './components/NikudSigns/Kamatz'
import Hirik from './components/NikudSigns/Hirik'
import VavHolam from './components/NikudSigns/VavHolam'
import Segol from './components/NikudSigns/Segol'
import VavShuruk from './components/NikudSigns/VavShuruk'
import Shva from './components/NikudSigns/Shva'
import Patach from './components/NikudSigns/Patach'
import Kubuts from './components/NikudSigns/Kubuts'
import Tzereh from './components/NikudSigns/Tzereh'
import HolamHaser from './components/NikudSigns/HolamHaser'
import './styles/nikud.css';
import './App.css';
import './styles/custom.css';

const nikudSounds = {
  'hirik': '/sounds/Hirik.wav',
  'holam-haser': '/sounds/HolamHaser.wav',
  'kamatz': '/sounds/Kamatz.wav',
  'kubuts': '/sounds/Kubuts.wav',
  'patach': '/sounds/Patach.wav',
  'segol': '/sounds/Segol.wav',
  'shva': '/sounds/Shva.wav',
  'tzereh': '/sounds/Tzereh.wav',
  'vav-holam': '/sounds/VavHolam.wav',
  'vav-shuruk': '/sounds/VavShuruk.wav'
};

const nikudVideos = {
  'hirik': '/video/hirik.mp4',
  'holam-haser': '/video/holam.mp4',
  'kamatz': '/video/kamatz.mp4',
  'kubuts': '/video/shuruk.mp4',
  'patach': '/video/kamatz.mp4',
  'segol': '/video/segol.mp4',
  'shva': '/video/segol.mp4',
  'tzereh': '/video/segol.mp4',
  'vav-holam': '/video/holam.mp4',
  'vav-shuruk': '/video/shuruk.mp4'
};

const NikudRows = ({ onNikudClick }) => (
  <div className="nikud-row-group">
    <div className="nikud-row">
      {/* First row of nikud signs */}
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Kamatz, 'kamatz')}>
        <Kamatz />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Hirik, 'hirik')}>
        <Hirik />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(VavHolam, 'vav-holam')}>
        <VavHolam />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Segol, 'segol')}>
        <Segol />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(VavShuruk, 'vav-shuruk')}>
        <VavShuruk />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Shva, 'shva')}>
        <Shva />
      </NikudTile>
    </div>
    <div className="nikud-row">
      {/* Second row of nikud signs */}
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Patach, 'patach')}>
        <Patach />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Hirik, 'hirik')}>
        <Hirik />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(HolamHaser, 'holam-haser')}>
        <HolamHaser />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Tzereh, 'tzereh')}>
        <Tzereh />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Kubuts, 'kubuts')}>
        <Kubuts />
      </NikudTile>
      <NikudTile width={60} height={90} onClick={() => onNikudClick(Shva, 'shva')}>
        <Shva />
      </NikudTile>
    </div>
  </div>
);

const PracticeRow = ({ selectedNikud, onPlayVideo }) => (
  <div className="practice-row">
    {selectedNikud.map((nikud, index) => (
      <div key={index} className="practice-item">
        {nikud && (
          <NikudTile 
            width={120} 
            height={180} 
            onClick={() => onPlayVideo(nikud.type)}
            className="practice-tile"
          >
            {nikud.type === 'holam-haser' ? (
              <svg 
                width="10" 
                height="10"
                viewBox="0 0 10 10"
                style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-15px',
                  outline: 'none'
                }}
              >
                <circle
                  cx="5"
                  cy="5"
                  r="4.65"
                  fill="black"
                />
              </svg>
            ) : nikud.type === 'patach' ? (
              <svg 
                width="30" 
                height="30"
                viewBox="0 0 30 30"
                style={{
                  position: 'absolute',
                  top: '90%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <line
                  x1="6"
                  y1="19"
                  x2="24"
                  y2="19"
                  stroke="black"
                  strokeWidth="5"
                />
              </svg>
            ) : nikud.type === 'shva' ? (
              <svg 
                width="30" 
                height="30"
                viewBox="0 0 30 30"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '5px'
                }}
              >
                <circle cx="15" cy="7" r="4.2" fill="black" />
                <circle cx="15" cy="19" r="4.2" fill="black" />
              </svg>
            ) : nikud.type === 'segol' ? (
              <svg 
                width="30" 
                height="30"
                viewBox="0 0 30 30"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '2px'
                }}
              >
                <g transform="translate(15, 10)">
                  <circle cx="-8" cy="0" r="4.6" fill="black" />
                  <circle cx="8" cy="0" r="4.6" fill="black" />
                  <circle cx="0" cy="9" r="4.6" fill="black" />
                </g>
              </svg>
            ) : nikud.type === 'hirik' ? (
              <svg 
                width="30" 
                height="30" 
                viewBox="0 0 30 30"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  marginTop: '1px'
                }}
              >
                <circle
                  cx="15"
                  cy="10"
                  r="4.6"
                  fill="black"
                />
              </svg>
            ) : nikud.type === 'vav-shuruk' ? (
              <svg 
                width="60" 
                height="162" 
                viewBox="0 0 30 70"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-14px',
                  transform: 'translate(-50%, -50%)',
                  marginTop: '0'
                }}
              >
                <path
                  d="M15 15 V56"
                  stroke="black"
                  strokeWidth="4.9"
                  fill="none"
                />
                <circle
                  cx="8"
                  cy="37"
                  r="3"
                  fill="black"
                  data-nikud="vav-shuruk"
                />
              </svg>
            ) : nikud.type === 'vav-holam' ? (
              <svg 
                width="60" 
                height="162" 
                viewBox="0 0 30 70"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '-14px',
                  transform: 'translate(-50%, -50%)',
                  marginTop: '0'
                }}
              >
                <path
                  d="M15 15 V56"
                  stroke="black"
                  strokeWidth="4.9"
                  fill="none"
                />
                <circle
                  cx="15"
                  cy="6"
                  r="3"
                  fill="black"
                  data-nikud="vav-holam"
                />
              </svg>
            ) : nikud.type === 'tzereh' ? (
              <svg 
                width="30" 
                height="15"
                viewBox="0 0 30 15"
                style={{
                  position: 'absolute',
                  top: '110%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              >
                <circle
                  cx="8"
                  cy="7.5"
                  r="5"
                  fill="black"
                />
                <circle
                  cx="22"
                  cy="7.5"
                  r="5"
                  fill="black"
                />
              </svg>
            ) : (
              <nikud.component />
            )}
          </NikudTile>
        )}
      </div>
    ))}
  </div>
);

export default function App() {
  const [selectedNikud, setSelectedNikud] = useState([null, null, null, null]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    const preventDefault = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    const preventZoom = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
      if (e.deltaY) {
        e.preventDefault();
      }
    };

    document.addEventListener('wheel', preventZoom, { passive: false });
    document.addEventListener('keydown', preventDefault);

    return () => {
      document.removeEventListener('wheel', preventZoom);
      document.removeEventListener('keydown', preventDefault);
    };
  }, []);

  const playVideo = (nikudType) => {
    setCurrentVideo(nikudVideos[nikudType]);
  };

  const handleNikudClick = (NikudComponent, nikudType) => {
    setSelectedNikud(prev => {
      const firstEmpty = prev.indexOf(null);
      if (firstEmpty === -1) {
        return [{ component: NikudComponent, type: nikudType }, null, null, null];
      }
      const newArray = [...prev];
      newArray[firstEmpty] = { component: NikudComponent, type: nikudType };
      return newArray;
    });
  };

  return (
    <div className="nikud-container">
      <div className="nikud-row-group">
        <div className="nikud-row">
          {/* First row of nikud signs */}
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Kamatz, 'kamatz')}>
            <Kamatz />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Hirik, 'hirik')}>
            <Hirik />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(VavHolam, 'vav-holam')}>
            <VavHolam />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Segol, 'segol')}>
            <Segol />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(VavShuruk, 'vav-shuruk')}>
            <VavShuruk />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Shva, 'shva')}>
            <Shva />
          </NikudTile>
        </div>
        <div className="nikud-row">
          {/* Second row of nikud signs */}
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Patach, 'patach')}>
            <Patach />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Hirik, 'hirik')}>
            <Hirik />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(HolamHaser, 'holam-haser')}>
            <HolamHaser />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Tzereh, 'tzereh')}>
            <Tzereh />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Kubuts, 'kubuts')}>
            <Kubuts />
          </NikudTile>
          <NikudTile width={60} height={90} onClick={() => handleNikudClick(Shva, 'shva')}>
            <Shva />
          </NikudTile>
        </div>
      </div>
      <video
        className="monkey-image"
        src={currentVideo}
        autoPlay
        onEnded={() => setCurrentVideo(null)}
        style={{
          width: '625px',
          height: '625px',
          objectFit: 'contain',
          marginTop: '20px'
        }}
      />
      <div className="practice-row">
        {selectedNikud.map((nikud, index) => (
          <div key={index} className="practice-item">
            {nikud && (
              <NikudTile 
                width={120} 
                height={180} 
                onClick={() => playVideo(nikud.type)}
                className="practice-tile"
              >
                {nikud.type === 'holam-haser' ? (
                  <svg 
                    width="10" 
                    height="10"
                    viewBox="0 0 10 10"
                    style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-15px',
                      outline: 'none'
                    }}
                  >
                    <circle
                      cx="5"
                      cy="5"
                      r="4.65"
                      fill="black"
                    />
                  </svg>
                ) : nikud.type === 'patach' ? (
                  <svg 
                    width="30" 
                    height="30"
                    viewBox="0 0 30 30"
                    style={{
                      position: 'absolute',
                      top: '90%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <line
                      x1="6"
                      y1="19"
                      x2="24"
                      y2="19"
                      stroke="black"
                      strokeWidth="5"
                    />
                  </svg>
                ) : nikud.type === 'shva' ? (
                  <svg 
                    width="30" 
                    height="30"
                    viewBox="0 0 30 30"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '5px'
                    }}
                  >
                    <circle cx="15" cy="7" r="4.2" fill="black" />
                    <circle cx="15" cy="19" r="4.2" fill="black" />
                  </svg>
                ) : nikud.type === 'segol' ? (
                  <svg 
                    width="30" 
                    height="30"
                    viewBox="0 0 30 30"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '2px'
                    }}
                  >
                    <g transform="translate(15, 10)">
                      <circle cx="-8" cy="0" r="4.6" fill="black" />
                      <circle cx="8" cy="0" r="4.6" fill="black" />
                      <circle cx="0" cy="9" r="4.6" fill="black" />
                    </g>
                  </svg>
                ) : nikud.type === 'hirik' ? (
                  <svg 
                    width="30" 
                    height="30" 
                    viewBox="0 0 30 30"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '1px'
                    }}
                  >
                    <circle
                      cx="15"
                      cy="10"
                      r="4.6"
                      fill="black"
                    />
                  </svg>
                ) : nikud.type === 'vav-shuruk' ? (
                  <svg 
                    width="60" 
                    height="162" 
                    viewBox="0 0 30 70"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '-14px',
                      transform: 'translate(-50%, -50%)',
                      marginTop: '0'
                    }}
                  >
                    <path
                      d="M15 15 V56"
                      stroke="black"
                      strokeWidth="4.9"
                      fill="none"
                    />
                    <circle
                      cx="8"
                      cy="37"
                      r="3"
                      fill="black"
                      data-nikud="vav-shuruk"
                    />
                  </svg>
                ) : nikud.type === 'vav-holam' ? (
                  <svg 
                    width="60" 
                    height="162" 
                    viewBox="0 0 30 70"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '-14px',
                      transform: 'translate(-50%, -50%)',
                      marginTop: '0'
                    }}
                  >
                    <path
                      d="M15 15 V56"
                      stroke="black"
                      strokeWidth="4.9"
                      fill="none"
                    />
                    <circle
                      cx="15"
                      cy="6"
                      r="3"
                      fill="black"
                      data-nikud="vav-holam"
                    />
                  </svg>
                ) : nikud.type === 'tzereh' ? (
                  <svg 
                    width="30" 
                    height="15"
                    viewBox="0 0 30 15"
                    style={{
                      position: 'absolute',
                      top: '110%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <circle
                      cx="8"
                      cy="7.5"
                      r="5"
                      fill="black"
                    />
                    <circle
                      cx="22"
                      cy="7.5"
                      r="5"
                      fill="black"
                    />
                  </svg>
                ) : (
                  <nikud.component />
                )}
              </NikudTile>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
