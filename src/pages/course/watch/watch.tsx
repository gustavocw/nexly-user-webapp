import { Box, Collapsible, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import Breadcrumb from "./breadcrumb/beadcrumb";
import VideoPlayer from "./player/player";
import PrevNext from "./player/prevnext/prevnext";
import { useState } from "react";
import CommentsVideo from "./comments/comments";

const Watch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleShow = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <VStack align="flex-start" py={20} w="100%">
      <VStack py={5} gap={0} mx="auto" align="flex-start" w="90%">
        <TitlePage title="Aula 1 - intrtodução" />
        <Flex w="100%" pl={10}>
          <Breadcrumb />
        </Flex>
      </VStack>
      <VideoPlayer videoUrl="https://www.youtube.com/watch?v=6X5krhF4RdA" />
      <PrevNext />
      <HStack align="flex-start" px={20} py={10} gap="64px" w="100%">
        <VStack gap="32px" w="70%">
          <Box
            w="100%"
            bg="neutral.60"
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            py="8px"
            px="16px"
          >
            <Collapsible.Root>
              <Text color="neutral.10">Primeira linha do comentario</Text>
              <Collapsible.Content>
                <Text color="neutral.10">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </Text>
              </Collapsible.Content>
              <Collapsible.Trigger
                onClick={handleShow}
                cursor="pointer"
                color="neutral"
              >
                {isOpen ? "Mostrar Menos" : "Mostrar mais"}
              </Collapsible.Trigger>
            </Collapsible.Root>
          </Box>
          <CommentsVideo />
        </VStack>
      </HStack>
    </VStack>
  );
};

export default Watch;
