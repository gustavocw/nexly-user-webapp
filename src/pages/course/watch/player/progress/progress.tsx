import React from "react";
import { HStack, Box } from "@chakra-ui/react";
import {
  ProgressRoot,
  ProgressBar,
  ProgressLabel,
  ProgressValueText,
} from "components/ui/progress";

interface ProgressPlayerProps {
  currentTime: number;
  duration: number;
  onValueChange: (value: number) => void;
}

const ProgressPlayer: React.FC<ProgressPlayerProps> = ({
  currentTime,
  duration,
  onValueChange,
}) => {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleProgressClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newProgress = (clickX / rect.width) * duration;
    onValueChange(newProgress);
  };

  return (
    <ProgressRoot
      value={progressPercent}
      max={101}
      w="100%"
      onClick={handleProgressClick}
    >
      <HStack h="70px" mx="auto" w="100%" gap={4}>
        <ProgressLabel color="neutral" fontSize="20px">
          {formatTime(currentTime)}
        </ProgressLabel>
        <ProgressBar
          colorPalette="orange"
          flex="1"
          height="8px"
          rounded="md"
          bg="neutral"
        >
          <Box
            bg="blue.500"
            height="8px"
            width={`${progressPercent}%`}
            rounded="md"
            transition="width 0.2s ease"
          />
        </ProgressBar>
        <ProgressValueText color="neutral" fontSize="20px">
          {formatTime(duration)}
        </ProgressValueText>
      </HStack>
    </ProgressRoot>
  );
};

export default ProgressPlayer;
