import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

import audiobtn_icon from "@/assets/audiobtn.svg";
import pause_icon from "@/assets/pause.svg";
import repeat_icon from "@/assets/repeat_suffle.svg";

// to show the playback time in minutes:seconds format like 5:30
const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  // to show playback time in minutes:seconds format like 7.05
  return (
    `${minutes}:` + // Add the minutes and a colon
    `${seconds < 10 ? "0" : ""}` + // Add a leading "0" if seconds are less than 10
    `${seconds}` // Add the seconds
  );
};

const AudioPlayer = ({ audioSrc }) => {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null); // Reference to the progress bar

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false); // State to track dragging
  const [isRepeat, setIsRepeat] = useState(false); // State for repeat mode

  // to handle play and pause status changes
  const handleAudioToggle = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed:", err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // to manage playback repeat functionality
  const handleRepeatToggle = () => {
    setIsRepeat(!isRepeat);
    if (audioRef.current) {
      audioRef.current.loop = !isRepeat;
    }
  };

  // when repeat is off, stops playback
  const handleAudioEnd = () => {
    if (!isRepeat) {
      setIsPlaying(false); // Stop the playback when repeat is off
      setCurrentTime(0); // Reset current time
    }
  };

  // update current time while dragging
  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // to set playback duration
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // to calculate playback time from the progress bar position
  const calculateTimeFromPosition = (x) => {
    if (progressBarRef.current) {
      const progressWidth = progressBarRef.current.offsetWidth;

      // To ensure the value of offsetX stays within the range 0 to progressWidth
      const offsetX = Math.min(Math.max(0, x), progressWidth);

      const newTime = (offsetX / progressWidth) * duration;
      return newTime;
    }
    return 0;
  };

  // to handle drag start events
  const handleDragStart = (e) => {
    setIsDragging(true);
  };

  // to handle drag move events
  const handleDragMove = (e) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newTime = calculateTimeFromPosition(e.clientX - rect.left);
      setCurrentTime(newTime);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      if (isDragging) setIsDragging(false);
    };

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleDragMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleDragMove);
    };
  }, [isDragging]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [audioSrc]);

  return (
    <div className="flex items-center">
      {/* Play/Pause Button */}
      <div
        className={`flex items-center ${audioSrc ? "" : "invisible"}`}
        onClick={handleAudioToggle}
      >
        <Image
          src={isPlaying ? pause_icon : audiobtn_icon}
          alt="audio control"
          className="hover:scale-110 transition-transform"
        />
      </div>

      {/* Progress Bar */}
      {audioSrc &&
        isPlaying && ( // Only show progress bar when audio is playing
          <div className="flex items-center ml-4 w-56 relative">
            <div
              ref={progressBarRef}
              className="w-full h-2 bg-gray-300 rounded cursor-pointer relative"
              onClick={(e) => {
                const rect = progressBarRef.current.getBoundingClientRect();
                const newTime = calculateTimeFromPosition(
                  e.clientX - rect.left
                );
                if (audioRef.current) {
                  audioRef.current.currentTime = newTime;
                  setCurrentTime(newTime);
                }
              }}
            >
              {/* Filled Progress line */}
              <div
                className="h-2 bg-primary rounded"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                }}
              ></div>

              {/* Draggable Circle */}
              <div
                className="absolute top-1/2 transform -translate-y-1/2 bg-primary rounded-full cursor-pointer active:cursor-grabbing"
                style={{
                  width: "16px",
                  height: "16px",
                  left: `calc(${(currentTime / duration) * 100}% - 8px)`, // Centering the circle
                }}
                onMouseDown={handleDragStart}
              ></div>
            </div>
            <div className="flex flex-col items-end text-xs text-gray-500 w-1/5 ml-2">
              <span>{formatTime(duration - currentTime)}</span>
            </div>

            {/* Repeat Button */}
            {audioSrc && (
              <div
                onClick={handleRepeatToggle}
                className={`ml-4 cursor-pointer border-2 rounded-lg px-2 py-1 ${
                  isRepeat
                    ? "text-primary border-primary rounded-lg"
                    : "text-gray-500 border-outline"
                }`}
              >
                <Image
                  src={repeat_icon}
                  alt="repeat control"
                  className="hover:scale-110 transition-transform"
                />
              </div>
            )}
          </div>
        )}

      {/* Audio Element */}
      {audioSrc && (
        <audio
          ref={audioRef}
          src={audioSrc}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleAudioEnd}
        />
      )}
    </div>
  );
};

export default AudioPlayer;
