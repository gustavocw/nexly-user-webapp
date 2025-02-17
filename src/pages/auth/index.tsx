import { HStack, Image, Stack, Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FormLogin from "./form/form";
import { useQuery } from "@tanstack/react-query";
import { getAreaLogin } from "services/area.services";

const getEmbedUrl = (url: string): string | null => {
  try {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playsinline=1&fs=0&disablekb=1&playlist=${videoId}`;
    }

    return null;
  } catch (error) {
    console.error("Erro ao processar URL do vídeo:", error);
    return null;
  }
};

const Auth: React.FC = () => {
  const rawUrl = window.location.hostname;
  const url = rawUrl === "localhost" ? "costaweb.dev.br" : rawUrl;
  const { data: areaLogin } = useQuery({
    queryKey: ["area-login", url],
    queryFn: async () => {
      const data = await getAreaLogin(url);
      return data;
    },
  });
  const videoUrl = areaLogin?.background
    ? getEmbedUrl(areaLogin.background)
    : null;
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowVideo(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HStack h="100vh" flex={1} position="relative">
      <Flex h="100%" w={{ base: "100%", md: "100%", lg: "50%" }}>
        <FormLogin />
      </Flex>
      <Stack
        position="relative"
        bg="#131313"
        display={{ base: "none", md: "none", lg: "flex" }}
        h="100vh"
        justify="center"
        width="50%"
        overflow="hidden"
      >
        <Box w="100%" h="100%" position="absolute" top="0" left="0">
          {videoUrl ? (
            <>
              {!showVideo && (
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100vh"
                  bg="black"
                  transition="opacity 1s ease-in-out"
                />
              )}

              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                allow="autoplay"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100vh",
                  objectFit: "cover",
                  pointerEvents: "none",
                  border: "none",
                  opacity: showVideo ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }}
              ></iframe>
            </>
          ) : (
            <Image
              h="100vh"
              w="100%"
              objectFit="cover"
              src={areaLogin?.background || "images/bglogin.png"}
            />
          )}
        </Box>
      </Stack>
    </HStack>
  );
};

export default Auth;
