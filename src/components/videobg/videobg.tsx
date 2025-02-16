import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { Icon, VStack } from "@chakra-ui/react";
import { RxSpeakerOff, RxSpeakerLoud } from "react-icons/rx";

interface VideoBackgroundProps {
  videoUrl: string;
  children: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl,
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

  return (
    <VStack
      w="100%"
      h={`${dimensions.height}px`}
      position="relative"
      overflow="hidden"
    >
      <ReactPlayer
        url={videoUrl}
        volume={0.1}
        playing={true}
        muted={isMuted}
        loop={true}
        width={getResponsiveDimensions().width}
        height={getResponsiveDimensions().height}
        style={{
          position: "absolute",
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
  );
};

export default VideoBackground;