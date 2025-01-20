import { Box, Flex, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import { PiChats } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const CommentsVideo = () => {
  return (
    <VStack gap="32px" align="flex-start" w="100%">
      <Flex gap="10px" alignItems="center">
        <Icon fontSize="16px" color="neutral">
          <PiChats />
        </Icon>
        <Text color="neutral" fontSize="16px">
          Comentários
        </Text>
      </Flex>
      <Flex w="100%" gap="10px" alignItems="center">
        <Avatar src="" w="50px" h="50px" />
        <Input
          w="100%"
          variant="flushed"
          placeholder="Escrever comentário"
          color="neutral"
        />
      </Flex>
      <VStack align="flex-start" w="100%">
        <Flex w="100%" gap="10px">
          <Avatar src="" w="32px" h="32px" />
          <Box w="100%">
            <Flex>
              <Text color="neutral.10">Nome • Há 12 horas</Text>
            </Flex>
            <Text fontSize="16px" color="neutral">
              Exemplo de comentário Exemplo de comentário Exemplo de comentário
              Exemplo de comentário
            </Text>
            <Flex my={2} alignItems="center" gap="16px">
              <Icon cursor="pointer" fontSize="20px" color="neutral">
                <BiLike />
              </Icon>
              <Text cursor="pointer" fontSize="16px" color="neutral">
                Responder
              </Text>
            </Flex>
            <Flex cursor="pointer" gap="10px" alignItems="center">
              <Text fontSize="16px" color="primary.40">
                3 Respostas
              </Text>
              <Icon color="primary.40" fontSize="16px">
                <IoIosArrowDown />
              </Icon>
            </Flex>
          </Box>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default CommentsVideo;
