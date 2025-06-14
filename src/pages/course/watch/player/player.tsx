import React from "react";
import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { FaCog, FaExpand, FaCompress } from "react-icons/fa";
import { Tooltip } from "components/ui/tooltip";
import { Slider } from "components/ui/slider";
import ProgressPlayer from "./progress/progress";
import useVideoController from "./player.controller";
import ReactPlayer from "react-player";
import { TbPlayerPlayFilled } from "react-icons/tb";
import { TbPlayerPauseFilled } from "react-icons/tb";
import {
  IoVolumeHighOutline,
  IoVolumeMediumOutline,
  IoVolumeLowOutline,
  IoVolumeMuteOutline,
} from "react-icons/io5";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "components/ui/menu";

interface VideoPlayerViewProps {
  videoUrl: string;
}

const VideoPlayerView: React.FC<VideoPlayerViewProps> = ({ videoUrl }) => {
  const {
    isMuted,
    volume,
    duration,
    currentTime,
    isFullscreen,
    showVolumeSlider,
    showControls,
    playerRef,
    playerContainerRef,
    toggleMute,
    toggleFullscreen,
    handleProgress,
    setVolume,
    handleDuration,
    handleSeek,
    onMouseMoveCapture,
    isPlaying,
    togglePlayPause,
    setShowVolumeSlider,
  } = useVideoController({ videoUrl });

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return <IoVolumeMuteOutline />;
    if (volume > 0 && volume <= 0.3) return <IoVolumeLowOutline />;
    if (volume > 0.3 && volume <= 0.7) return <IoVolumeMediumOutline />;
    return <IoVolumeHighOutline />;
  };

  const getResponsiveHeight = () => {
    const { innerWidth } = window;
    if (innerWidth < 768) {
      return "56.25vw";
    } else if (innerWidth < 992) {
      return "56.25vw";
    } else {
      return isFullscreen ? "100vh" : "80vh";
    }
  };

  const isMobile = window.innerWidth < 768;

  return (
    <Box
      position="relative"
      bg="black"
      maxW="100%"
      mx="auto"
      rounded="md"
      overflow="hidden"
      ref={playerContainerRef}
    >
      <VStack
        align="center"
        position="absolute"
        alignItems="center"
        justify="center"
        mx="auto"
        bottom={0}
        left={0}
        right={0}
        width="100%"
        height="100vh"
        onMouseMove={onMouseMoveCapture}
        onClick={togglePlayPause}
      >
        {showControls && (
          <Icon
            fontSize="100px"
            color="neutral"
            m="auto"
            cursor="pointer"
            onClick={togglePlayPause}
          >
            {isPlaying ? (
              <TbPlayerPauseFilled onClick={togglePlayPause} />
            ) : (
              <TbPlayerPlayFilled onClick={togglePlayPause} />
            )}
          </Icon>
        )}
      </VStack>

      <ReactPlayer
        ref={playerRef}
        url={videoUrl || ""}
        playing={isPlaying}
        muted={isMuted}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        width="100vw"
        height={getResponsiveHeight()}
        controls={false}
        config={{
          youtube: {
            playerVars: {
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              disablekb: 1,
            },
          },
        }}
      />
      {showControls && (
        <VStack
          align="start"
          bg="transparent"
          p={2}
          position="absolute"
          mx="auto"
          bottom={0}
          left={0}
          right={0}
          w="95%"
        >
          <Flex
            alignItems="flex-end"
            w="100%"
            justify="space-between"
            align="center"
            mb={{ base: 0, md: 2 }}
          >
            <Flex align="center">
              <VStack
                align="center"
                onMouseEnter={() => {
                  if (!isMobile) setTimeout(() => setShowVolumeSlider(true), 200);
                }}
                onMouseLeave={() => {
                  if (!isMobile) setTimeout(() => setShowVolumeSlider(false), 300);
                }}
              >
                {!isMobile && showVolumeSlider && (
                  <>
                    <Slider
                      height="200px"
                      orientation="vertical"
                      defaultValue={[volume * 100]}
                      onValueChange={(value) => setVolume(value.value[0] / 100)}
                      colorPalette="orange"
                      cursor="pointer"
                    />
                    <Text color="neutral">{Math.round(volume * 100)}</Text>
                  </>
                )}
                <Tooltip content={isMuted ? "Unmute" : "Mute"}>
                  <Icon
                    fontSize={{ base: "24px", md: "32px" }}
                    color="neutral"
                    cursor="pointer"
                    onClick={toggleMute}
                  >
                    {getVolumeIcon()}
                  </Icon>
                </Tooltip>
              </VStack>
            </Flex>

            <Flex gap={5} align="center">
              <Tooltip content="Settings">
                <MenuRoot positioning={{ placement: "top-end" }}>
                  <MenuTrigger cursor="pointer" asChild>
                    <Icon fontSize={{ base: "24px", md: "32px" }} color="neutral">
                      <FaCog />
                    </Icon>
                  </MenuTrigger>
                  <MenuContent bg="neutral.60">
                    <MenuItem
                      color="neutral"
                      p={2}
                      cursor="pointer"
                      _hover={{ bg: "orange" }}
                      value="new-txt"
                    >
                      1080p
                    </MenuItem>
                    <MenuItem
                      color="neutral"
                      p={2}
                      cursor="pointer"
                      _hover={{ bg: "orange" }}
                      value="new-file"
                    >
                      720p
                    </MenuItem>
                    <MenuItem
                      color="neutral"
                      p={2}
                      cursor="pointer"
                      _hover={{ bg: "orange" }}
                      value="new-win"
                    >
                      480p
                    </MenuItem>
                    <MenuItem
                      color="neutral"
                      p={2}
                      cursor="pointer"
                      _hover={{ bg: "orange" }}
                      value="open-file"
                    >
                      240p
                    </MenuItem>
                    <MenuItem
                      color="neutral"
                      p={2}
                      cursor="pointer"
                      _hover={{ bg: "orange" }}
                      value="export"
                    >
                      144p
                    </MenuItem>
                  </MenuContent>
                </MenuRoot>
              </Tooltip>
              <Tooltip
                content={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                <Icon
                  fontSize={{ base: "24px", md: "32px" }}
                  color="neutral"
                  cursor="pointer"
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </Icon>
              </Tooltip>
            </Flex>
          </Flex>
          <Flex w="100%" align="center">
            <ProgressPlayer
              currentTime={currentTime}
              duration={duration}
              onValueChange={handleSeek}
            />
          </Flex>
        </VStack>
      )}
    </Box>
  );
};

export default VideoPlayerView;
