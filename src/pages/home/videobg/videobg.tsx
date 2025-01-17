import { VStack } from "@chakra-ui/react";

interface VideoBackgroundProps {
  videoUrl: string;
  children?: React.ReactNode;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ videoUrl, children }) => {
  const videoId = extractVideoId(videoUrl);

  return (
    <VStack
      w="100%"
      h={{ base: "35vh", md: "100vh" }}
      position="relative"
      overflow="hidden"
    >
      {videoId && (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&modestbranding=1`}
          style={{
            position: "absolute",
            top: "-10%",
            left: "-10%",
            width: "120%",
            height: "120%",
            pointerEvents: "none",
            border: "none",
          }}
          allow="autoplay; fullscreen; loop"
          allowFullScreen
        ></iframe>
      )}
      <VStack
        position="relative"
        zIndex="1"
        w="100%"
        h="100%"
        display={{ base: "none", md: "flex" }}
        justifyContent="flex-end"
        alignItems="flex-start"
        color="white"
      >
        {children}
      </VStack>
    </VStack>
  );
};

const extractVideoId = (url: string) => {
  const match = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/);
  return match ? match[1] : null;
};

export default VideoBackground;
