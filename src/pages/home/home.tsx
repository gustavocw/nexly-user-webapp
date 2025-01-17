import { Text, VStack, Icon, Flex, Box, HStack } from "@chakra-ui/react";
import VideoBackground from "./videobg/videobg";
import { FaCircleExclamation } from "react-icons/fa6";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "components/ui/progress";
import Btn from "components/button/button";
import { RxSpeakerLoud } from "react-icons/rx";
import CardProduct from "./cards/cards";
import { dummyProducts } from "./cards/dummy";

const Home = () => {
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
            maxW={{ base: "100%", md: "40%" }}
            p={{ base: 4, md: 20 }}
          >
            <Flex gap={2} w="100%">
              <Icon color="orange">
                <FaCircleExclamation />
              </Icon>
              <Text whiteSpace="nowrap" fontSize="14px" fontWeight="bold">
                Receba seu certificado após a conclusão das aulas
              </Text>
            </Flex>
            <Flex gap={2} w="100%">
              <ProgressRoot
                colorPalette="orange"
                display="flex"
                gap={2}
                alignItems="center"
                w="80%"
                defaultValue={40}
                min={0}
                max={100}
                orientation="horizontal"
              >
                <ProgressValueText>40%</ProgressValueText>
                <ProgressBar bg="#00000066" borderRadius="50px" w="100%" />
              </ProgressRoot>
            </Flex>
            <Text fontSize="32px">Nome da área</Text>
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
          <Icon
            m={10}
            alignSelf="flex-end"
            justifySelf="flex-end"
            color="#fff"
            fontSize="34px"
          >
            <RxSpeakerLoud />
          </Icon>
        </Flex>
      </VideoBackground>
      <HStack align="flex-start" gap={4} w="100%">
        {dummyProducts.map((item) => (
          <VStack px="32px" h="400px">
            <CardProduct
              key={item._id}
              productName={item.name}
              productImage={item.thumbnail}
            />
          </VStack>
        ))}
      </HStack>
    </Box>
  );
};

export default Home;
