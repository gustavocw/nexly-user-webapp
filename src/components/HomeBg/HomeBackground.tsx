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
      const proportionalHeight = Math.max(innerHeight * (innerWidth / 1920), 510);
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

  const getResponsiveDimensions = () => {
    const { innerWidth } = window;
    if (innerWidth < 768) {
      return { width: "300%", height: "100%", minHeight: "510px" };
    } else if (innerWidth < 992) {
      return { width: "130%", height: "130%" };
    } else {
      return { width: "120%", height: "120%" };
    }
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
        width={getResponsiveDimensions().width}
        height={getResponsiveDimensions().height}
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          minHeight: getResponsiveDimensions().minHeight || "100%",
          pointerEvents: "none",
        }}
      />
      <VStack
        position="relative"
        zIndex="1"
        w="100%"
        h="100%"
        justifyContent="flex-end"
        alignItems="flex-start"
        color="white"
      >
        {children}
        <Icon
          mx={10}
          my={{ base: 5, md: 20 }}
          alignSelf="flex-end"
          justifySelf="flex-end"
          color="#fff"
          position="absolute"
          fontSize={{ base: "26px", md: "34px" }}
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
