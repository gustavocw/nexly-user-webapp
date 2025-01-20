import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

interface UseVideoControllerProps {
  videoUrl: string;
}

const useVideoController = ({ videoUrl }: UseVideoControllerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      playerContainerRef.current?.requestFullscreen();
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen((prev) => !prev);
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played * 100);
    if (playerRef.current) {
      setCurrentTime(playerRef.current.getCurrentTime());
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    playerRef.current?.seekTo(newTime);
  };

  const onMouseMoveCapture = () => {
    setShowControls(true);
    document.body.style.cursor = "default";
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowControls(false);
      document.body.style.cursor = "none";
    }, 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      document.body.style.cursor = "default";
    };
  }, []);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return {
    videoUrl,
    isMuted,
    volume,
    played,
    isPlaying,
    togglePlayPause,
    duration,
    currentTime,
    isFullscreen,
    showVolumeSlider,
    showControls,
    setVolume,
    playerRef,
    playerContainerRef,
    toggleMute,
    toggleFullscreen,
    handleProgress,
    handleDuration,
    handleSeek,
    onMouseMoveCapture,
    setShowVolumeSlider,
  };
};

export default useVideoController;
