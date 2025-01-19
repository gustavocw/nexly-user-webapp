import { Flex, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import Breadcrumb from "./breadcrumb/beadcrumb";
import VideoPlayer from "./player/player";

const Watch = () => {
  return (
    <VStack align="flex-start" py={20} w="100%">
      <VStack py={5} gap={0} mx="auto" align="flex-start" w="90%">
        <TitlePage title="Aula 1 - intrtodução" />
        <Flex w="100%" pl={10}>
          <Breadcrumb />
        </Flex>
      </VStack>
      <VideoPlayer videoUrl="https://www.youtube.com/watch?v=6X5krhF4RdA" />
    </VStack>
  );
};

export default Watch;
