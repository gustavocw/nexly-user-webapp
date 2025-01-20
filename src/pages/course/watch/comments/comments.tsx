import { Flex, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import { PiChats } from "react-icons/pi";

const CommentsVideo = () => {
  return (
    <VStack align="flex-start" w="100%">
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
        <Input w="100%" variant="flushed" placeholder="Escrever comentário" color="neutral" />
      </Flex>
    </VStack>
  );
};

export default CommentsVideo;
