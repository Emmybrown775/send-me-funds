import React, { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { FaPlay, FaPause } from "react-icons/fa";
import audio11 from './assets/11.m4a';
import audio12 from './assets/12.m4a';
import audio13 from './assets/13.m4a';

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [buttonLocation, setLocation] = useState([0, 0]);
  const [isOpen, setIsOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const responses = [
    "Bros na beg i dey beg you",
    "Sir pleae sir",
    "IF YOU CONTINUE TO GIVE...",
    "Temporary Solutions.....",
    "To the poorest of the poor",
    "Bro...bro....bro..this is the sixth time na",
    "GUY YOU STINGY OOOH",
    "INFACT FUCK YOU SEF",
    "Oya, I'm sorry please the yes button is right there",
    audio11,
    audio12,
    audio13,
  ];

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);

    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);
    setLocation([x, y]);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Open popup
  const openPopup = () => {
    setIsOpen(true);
  };

  // Close popup
  const closePopup = () => {
    setIsOpen(false);
  };

  let content;

  if (count <= 9 && count >= 1) {
    content = <div>
      <h3 className="text-gray-500">{responses[count - 1]}</h3>
    </div>
  } else if (count >= 10 && count <= 12) {
    content = <div className="max-w-md mx-auto mt-10 p-2 bg-gray-100 rounded-lg shadow-lg">
      <audio
        ref={audioRef}
        src={responses[count - 1]}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>

      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <div className="flex items-center space-x-2 text-sm">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            value={currentTime}
            max={duration}
            onChange={(e) => {
              audioRef.current.currentTime = e.target.value;
              setCurrentTime(e.target.value);
            }}
            className="w-32 h-1 bg-gray-300 rounded appearance-none"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  } else {
    content = <div></div>
  }

  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div>
          <h1 className="text-white text-3xl">Send Funds</h1>
          {content}
          <div className="flex justify-center gap-x-4 pt-3">
            {count < 13 ? <button
              onClick={handleClick}
              style={{
                position: `${count > 0 ? "absolute" : "relative"}`,
                left: `${buttonLocation[0]}px`,
                top: `${buttonLocation[1]}px`,
              }}
              className="w-24 py-2 rounded-md bg-slate-600 text-white"
            >
              No
            </button>: <div></div>}
            <button 
              onClick={openPopup} 
              className="w-24 py-2 rounded-md bg-slate-600 text-white"
            >
              Yes
            </button>
          </div>
        </div>

        {isOpen && (
          <div 
            className="fixed inset-0 m-6 bg-opacity-50 flex items-center justify-center z-50"
            onClick={closePopup}
          >
            <div 
              className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative"
              onClick={(e) => e.stopPropagation()}
            >

              <p className="text-gray-700 ">
                7010891180
              </p>
              <p>
                OPAY
              </p>
              <p>
                Elumeze Emmanuel
              </p>

              
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;