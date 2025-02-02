import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Icon, VStack, Box } from "@chakra-ui/react";
import { RxSpeakerOff, RxSpeakerLoud } from "react-icons/rx";

interface BackgroundHomeProps {
  backgroundUrl?: string;
  children: React.ReactNode;
}

const BackgroundHome: React.FC<BackgroundHomeProps> = ({
  backgroundUrl,
  children,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth, innerHeight } = window;
      const proportionalHeight = Math.max(
        innerHeight * (innerWidth / 1920),
        300
      );
      setDimensions({
        width: innerWidth,
        height: proportionalHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isVideo = (url?: string) => {
    if (!url) return false;
    const isFile = url.match(/\.(mp4|webm|ogg)$/i);
    const isStreaming = /(?:youtube\.com|youtu\.be|vimeo\.com)/i.test(url);
    return isFile || isStreaming;
  };
  

  return isVideo(backgroundUrl) ? (
    <VStack
      w="100%"
      h={`${dimensions.height}px`}
      position="relative"
      overflow="hidden"
    >
      <ReactPlayer
        url={backgroundUrl}
        volume={0.1}
        playing={true}
        muted={isMuted}
        loop={true}
        width="120%"
        height="120%"
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          pointerEvents: "none",
        }}
      />
      <VStack
        position="relative"
        zIndex="1"
        w="100%"
        h="100%"
        display={{ base: "none", md: "none", lg: "flex" }}
        justifyContent="flex-end"
        alignItems="flex-start"
        color="white"
      >
        {children}
        <Icon
          mx={10}
          my={20}
          alignSelf="flex-end"
          justifySelf="flex-end"
          color="#fff"
          position="absolute"
          fontSize="34px"
          cursor="pointer"
          onClick={toggleMute}
        >
          {isMuted ? <RxSpeakerOff /> : <RxSpeakerLoud />}
        </Icon>
      </VStack>
    </VStack>
  ) : (
    <Box
      bgImage={`url(${backgroundUrl})`}
      bgSize="cover"
      bgPos="center"
      bgRepeat="no-repeat"
      h={`${dimensions.height}px`}
      w="100%"
      position="relative"
    >
      {children}
    </Box>
  );
};

export default BackgroundHome;
