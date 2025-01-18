import { Text, VStack, Icon, Flex, Box, HStack } from "@chakra-ui/react";
import { FaCircleExclamation } from "react-icons/fa6";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "components/ui/progress";
import Btn from "components/button/button";
import { useState, useEffect } from "react";
import VideoBackground from "components/videobg/videobg";
import { useLocation } from "react-router-dom";
import CardModules from "./cards/cards";

const Course = () => {
  const [boxWidth, setBoxWidth] = useState("40%");
  const location = useLocation();
  const { course } = location.state || {};

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      const calculatedWidth = Math.min(
        40 + (100 - (innerWidth / 1920) * 100),
        100
      );
      setBoxWidth(`${calculatedWidth}%`);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box h="100vh" w="100%">
      <VideoBackground videoUrl="https://www.youtube.com/watch?v=Ttl8Gg-P-Ao">
        <Flex
          bg="linear-gradient(0deg, #1F1D22 0%, rgba(16, 18, 26, 0) 100%)"
          justify="space-between"
          w="100%"
        >
          <VStack
            gap="16px"
            align="flex-start"
            maxW={{ base: "100%", md: "100%", lg: boxWidth }}
            p={{ base: 4, md: 20 }}
          >
            <Flex gap={2} w="60%">
              <Icon color="orange">
                <FaCircleExclamation />
              </Icon>
              <Text whiteSpace="nowrap" fontSize="14px" fontWeight="bold">
                Receba seu certificado após a conclusão das aulas
              </Text>
            </Flex>
            <Flex gap={2} w="60%">
              <ProgressRoot
                colorPalette="orange"
                display="flex"
                gap={2}
                alignItems="center"
                w="100%"
                defaultValue={40}
                min={0}
                max={100}
                orientation="horizontal"
              >
                <ProgressValueText>40%</ProgressValueText>
                <ProgressBar bg="#00000066" borderRadius="50px" w="100%" />
              </ProgressRoot>
            </Flex>
            <Text fontSize={{ base: "16px", md: "20px", lg: "32px" }}>
              Nome da área
            </Text>
            <Text fontSize="16px">
              Descubra o cosmos com 'Exploração Espacial 101'. Este curso
              envolvente abrange astronomia, exoplanetas e muito mais. Perfeito
              para iniciantes e amantes do espaço, oferece uma experiência única
              através de imagens estelares, telescópios e naves espaciais.
            </Text>
            <Btn
              label="Continuar de onde eu parei"
              bg="orange"
              w="260px"
              bgHover="orange.700"
              borderRadius="50px"
            />
          </VStack>
        </Flex>
      </VideoBackground>
      <HStack overflowX="auto" px={{ base: "10px", md: "32px" }} align="flex-start" gap={4} w="100%">
        {course?.modules?.map((module: any) => (
          <VStack h="400px" key={module._id}>
            <CardModules module={module} />
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default Course;
