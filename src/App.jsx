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
import './styles/tablet.css';
import VideoWindow from './components/VideoWindow'

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

const freezeFrameTimes = {
  'kamatz': 0.60,
  'hirik': 0.50,
  'holam-haser': 0.50,
  'segol': 0.50,
  'vav-shuruk': 0.50,
  // נוסיף זמנים נוספים כשנקבל אותם
};

const findNikudType = (videoPath) => {
  // מחפש את סוג הניקוד לפי הנתיב
  if (videoPath === '/video/shuruk.mp4') return 'vav-shuruk';
  if (videoPath === '/video/kamatz.mp4') return 'kamatz';
  if (videoPath === '/video/hirik.mp4') return 'hirik';
  if (videoPath === '/video/holam.mp4') return 'holam-haser';
  if (videoPath === '/video/segol.mp4') return 'segol';
  return null;
};

export default function App() {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [selectedNikud, setSelectedNikud] = useState([null, null, null, null]);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [secondVideo, setSecondVideo] = useState(null);
  const [thirdVideo, setThirdVideo] = useState(null);
  const [fourthVideo, setFourthVideo] = useState(null);
  const [isWarehouseVisible, setIsWarehouseVisible] = useState(true);
  const [lastVideos, setLastVideos] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null
  });

  const toggleWarehouse = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsWarehouseVisible(prev => !prev);
  };

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

  const playVideo = (type, index) => {
    const videoPath = nikudVideos[type];
    
    setIsWarehouseVisible(false);
    
    if (index === 0) {
      setCurrentVideo(null);
      setTimeout(() => setCurrentVideo(videoPath), 0);
    } else if (index === 1) {
      setSecondVideo(null);
      setTimeout(() => setSecondVideo(videoPath), 0);
    } else if (index === 2) {
      setThirdVideo(null);
      setTimeout(() => setThirdVideo(videoPath), 0);
    } else if (index === 3) {
      setFourthVideo(null);
      setTimeout(() => setFourthVideo(videoPath), 0);
    }

    if (index !== 0) setCurrentVideo(null);
    if (index !== 1) setSecondVideo(null);
    if (index !== 2) setThirdVideo(null);
    if (index !== 3) setFourthVideo(null);

    setLastVideos(prev => ({
      ...prev,
      [index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : 'fourth']: videoPath
    }));
  };

  const handleNikudClick = (NikudComponent, nikudType) => {
    setSelectedNikud(prev => {
      const firstEmpty = prev.indexOf(null);
      if (firstEmpty === -1) {
        const videoPath = nikudVideos[nikudType];
        setLastVideos(prev => ({
          ...prev,
          first: videoPath
        }));
        setCurrentVideo(null);
        return [{ component: NikudComponent, type: nikudType }, null, null, null];
      }
      const videoPath = nikudVideos[nikudType];
      setLastVideos(prev => ({
        ...prev,
        [firstEmpty === 0 ? 'first' : firstEmpty === 1 ? 'second' : firstEmpty === 2 ? 'third' : 'fourth']: videoPath
      }));
      if (firstEmpty === 0) setCurrentVideo(null);
      else if (firstEmpty === 1) setSecondVideo(null);
      else if (firstEmpty === 2) setThirdVideo(null);
      else if (firstEmpty === 3) setFourthVideo(null);
      
      const newArray = [...prev];
      newArray[firstEmpty] = { component: NikudComponent, type: nikudType };
      return newArray;
    });
  };

  return (
    <div className="nikud-container">
      <button 
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          width: '52px',
          height: '75px',
          zIndex: 1000,
          background: 'transparent',
          border: '1px solid black',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: isWarehouseVisible ? '81px' : '57px',
          fontWeight: '300',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          touchAction: 'none',
          color: '#1E4D8C',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onClick={toggleWarehouse}
        onMouseDown={toggleWarehouse}
        onTouchStart={toggleWarehouse}
        onContextMenu={(e) => e.preventDefault()}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        {isWarehouseVisible ? '-' : '+'}
      </button>
      <button 
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          width: '52px',
          height: '75px',
          zIndex: 1000,
          background: 'transparent',
          border: '1px solid black',
          borderRadius: '12px',
          cursor: 'pointer',
          fontSize: isWarehouseVisible ? '81px' : '57px',
          fontWeight: '300',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          userSelect: 'none',
          touchAction: 'none',
          color: '#1E4D8C',
          backdropFilter: 'blur(5px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}
        onClick={toggleWarehouse}
        onMouseDown={toggleWarehouse}
        onTouchStart={toggleWarehouse}
        onContextMenu={(e) => e.preventDefault()}
      >
        {isWarehouseVisible ? '-' : '+'}
      </button>

      <div className="nikud-row-group" style={{
        opacity: isWarehouseVisible ? 1 : 0,
        visibility: isWarehouseVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        height: isWarehouseVisible ? 'auto' : 0,
        overflow: 'hidden',
        paddingBottom: '20px'
      }}>
        <div className="nikud-row">
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Kamatz, 'kamatz')} noBorder={true}>
            <Kamatz />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Hirik, 'hirik')} noBorder={true}>
            <Hirik />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(VavHolam, 'vav-holam')} noBorder={true}>
            <VavHolam />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Segol, 'segol')} noBorder={true}>
            <Segol />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(VavShuruk, 'vav-shuruk')} noBorder={true}>
            <VavShuruk />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Shva, 'shva')} noBorder={true}>
            <Shva />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Patach, 'patach')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <Patach />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Hirik, 'hirik')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <Hirik />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(HolamHaser, 'holam-haser')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <HolamHaser />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Tzereh, 'tzereh')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <svg 
              width="30" 
              height="25"
              viewBox="0 0 30 25"
              style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <circle
                cx="8"
                cy="10"
                r="4.2"
                fill="black"
              />
              <circle
                cx="22"
                cy="10"
                r="4.2"
                fill="black"
              />
            </svg>
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Kubuts, 'kubuts')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <Kubuts />
          </NikudTile>
        </div>
        <div className="nikud-row" style={{ marginTop: '10px' }}>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Kamatz, 'kamatz')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <Kamatz />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Hirik, 'hirik')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <Hirik />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(VavHolam, 'vav-holam')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <VavHolam />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Segol, 'segol')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <Segol />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(VavShuruk, 'vav-shuruk')} noBorder={true} style={{ border: '3px solid rgba(255, 215, 0, 0)', opacity: 0 }}>
            <VavShuruk />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Patach, 'patach')} noBorder={true}>
            <Patach />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Hirik, 'hirik')} noBorder={true}>
            <Hirik />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(HolamHaser, 'holam-haser')} noBorder={true}>
            <HolamHaser />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Tzereh, 'tzereh')} noBorder={true}>
            <svg 
              width="30" 
              height="25"
              viewBox="0 0 30 25"
              style={{
                position: 'absolute',
                top: '110%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <circle
                cx="8"
                cy="10"
                r="4.2"
                fill="black"
              />
              <circle
                cx="22"
                cy="10"
                r="4.2"
                fill="black"
              />
            </svg>
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Kubuts, 'kubuts')} noBorder={true}>
            <Kubuts />
          </NikudTile>
          <NikudTile width={60} height={86} onClick={() => handleNikudClick(Shva, 'shva')} noBorder={true}>
            <Shva />
          </NikudTile>
        </div>
      </div>
      <div className="practice-row">
        {selectedNikud.map((nikud, index) => (
          <div 
            key={index} 
            className="practice-item"
            {...('ontouchstart' in window
              ? {
                  onTouchStart: (e) => {
                    e.preventDefault();
                    nikud && playVideo(nikud.type, index);
                  }
                }
              : {
                  onMouseDown: () => nikud && playVideo(nikud.type, index)
                }
            )}
            style={{ 
              touchAction: 'none'
            }}
          >
            {nikud && (
              <NikudTile
                width={120} 
                height={144} 
                className="practice-tile"
                noBorder={true}
              >
                {nikud.type === 'kamatz' ? (
                  <svg 
                    width="36" 
                    height="30"
                    viewBox="0 0 36 30"
                    style={{
                      position: 'absolute',
                      top: '101%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: '0px'
                    }}
                  >
                    <path
                      d="M16.5,27.5 L16.5,12 M-3,12 L33,12"
                      stroke="black"
                      strokeWidth="8.64"
                      fill="none"
                    />
                  </svg>
                ) : nikud.type === 'holam-haser' ? (
                  <svg 
                    width="10" 
                    height="10"
                    viewBox="0 0 10 10"
                    style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '-15px',
                      outline: 'none',
                      transform: 'scale(2)'
                    }}
                  >
                    <circle
                      cx="5"
                      cy="5"
                      r="4.6"
                      fill="black"
                    />
                  </svg>
                ) : nikud.type === 'patach' ? (
                  <svg 
                    width="36" 
                    height="30"
                    viewBox="0 0 36 30"
                    style={{
                      position: 'absolute',
                      top: '95%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <line
                      x1="-3"
                      y1="19"
                      x2="33"
                      y2="19"
                      stroke="black"
                      strokeWidth="10.37"
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
                      transform: 'translateX(-50%) scale(2)',
                      marginTop: '5px'
                    }}
                  >
                    <circle cx="15" cy="12" r="4.2" fill="black" />
                    <circle cx="15" cy="24" r="4.2" fill="black" />
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
                      transform: 'translateX(-50%) scale(2)',
                      marginTop: '2px'
                    }}
                  >
                    <g transform="translate(15, 10)">
                      <circle cx="-8" cy="5" r="4.6" fill="black" />
                      <circle cx="8" cy="5" r="4.6" fill="black" />
                      <circle cx="0" cy="14" r="4.6" fill="black" />
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
                      transform: 'translateX(-50%) scale(2)',
                      marginTop: '1px'
                    }}
                  >
                    <circle
                      cx="15"
                      cy="15"
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
                      d="M17 15 V56"
                      stroke="black"
                      strokeWidth="5.88"
                      fill="none"
                    />
                    <circle
                      cx="8"
                      cy="37"
                      r="4.6"
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
                      strokeWidth="5.88"
                      fill="none"
                    />
                    <g transform="scale(2)">
                      <circle
                        cx="7.5"
                        cy="3"
                        r="1.15"
                        fill="black"
                        className="vav-holam-dot"
                        data-nikud="vav-holam"
                      />
                    </g>
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
                      transform: 'translateX(-50%) scale(2)',
                    }}
                  >
                    <circle
                      cx="8"
                      cy="10"
                      r="4.2"
                      fill="black"
                    />
                    <circle
                      cx="22"
                      cy="10"
                      r="4.2"
                      fill="black"
                    />
                  </svg>
                ) : nikud.type === 'kubuts' ? (
                  <svg 
                    width="35" 
                    height="40"
                    viewBox="0 0 35 40"
                    style={{
                      position: 'absolute',
                      top: '115%',
                      left: '50%',
                      transform: 'translateX(-50%) scale(2)',
                    }}
                  >
                    <circle
                      cx="6"
                      cy="11.5"
                      r="4.6"
                      fill="black"
                    />
                    <circle
                      cx="16"
                      cy="19.5"
                      r="4.6"
                      fill="black"
                    />
                    <circle
                      cx="26"
                      cy="28.5"
                      r="4.6"
                      fill="black"
                    />
                  </svg>
                ) : (
                  nikud.component()
                )}
              </NikudTile>
            )}
          </div>
        ))}
      </div>
      <div className="video-overlay" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '75%',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        pointerEvents: 'none'
      }}>
        <>
          <VideoWindow
            videoSrc={currentVideo}
            onEnded={(timeoutRef) => {
              const video = document.querySelector('[data-video="first"] video');
              if (video) {
                video.style.transition = 'opacity 1s ease-out';
                video.style.opacity = '0';
                timeoutRef.current = setTimeout(() => setCurrentVideo(null), 1000);
              }
            }}
            style={{
              right: '-2.5%',
              marginRight: '-3.2cm',
              marginTop: '3mm',
              width: '353px',
              height: '353px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            isPlaying={!!currentVideo}
            freezeTime={freezeFrameTimes[findNikudType(currentVideo)]}
            data-video="first"
          />
          <VideoWindow
            videoSrc={secondVideo}
            onEnded={(timeoutRef) => {
              const video = document.querySelector('[data-video="second"] video');
              if (video) {
                video.style.transition = 'opacity 1s ease-out';
                video.style.opacity = '0';
                timeoutRef.current = setTimeout(() => setSecondVideo(null), 1000);
              }
            }}
            style={{
              right: '-11.5%',
              marginRight: '4mm',
              marginTop: '3mm',
              width: '353px',
              height: '353px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            isPlaying={!!secondVideo}
            freezeTime={freezeFrameTimes[findNikudType(secondVideo)]}
            data-video="second"
          />
          <VideoWindow
            videoSrc={thirdVideo}
            onEnded={(timeoutRef) => {
              const video = document.querySelector('[data-video="third"] video');
              if (video) {
                video.style.transition = 'opacity 1s ease-out';
                video.style.opacity = '0';
                timeoutRef.current = setTimeout(() => setThirdVideo(null), 1000);
              }
            }}
            style={{
              right: '0.5%',
              marginRight: '-64mm',
              marginTop: '3mm',
              width: '353px',
              height: '353px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            isPlaying={!!thirdVideo}
            freezeTime={freezeFrameTimes[findNikudType(thirdVideo)]}
            data-video="third"
          />
          <VideoWindow
            videoSrc={fourthVideo}
            onEnded={(timeoutRef) => {
              const video = document.querySelector('[data-video="fourth"] video');
              if (video) {
                video.style.transition = 'opacity 1s ease-out';
                video.style.opacity = '0';
                timeoutRef.current = setTimeout(() => setFourthVideo(null), 1000);
              }
            }}
            style={{
              right: '12%',
              width: '353px',
              marginRight: '-66.5mm',
              marginTop: '3mm',
              height: '353px',
              borderRadius: '12px',
              overflow: 'hidden'
            }}
            isPlaying={!!fourthVideo}
            freezeTime={freezeFrameTimes[findNikudType(fourthVideo)]}
            data-video="fourth"
          />
        </>
      </div>
    </div>
  );
}
