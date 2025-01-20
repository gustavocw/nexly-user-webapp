import { Box, Text, VStack } from "@chakra-ui/react";

const LessonList = () => {
  return (
    <VStack w="100%">
      <Text color="neutral" fontSize="26px">Nome do módulo</Text>
      <VStack align="center" w="100%" spaceY={2}>
        <VStack align="flex-start" w="320px">
        <Box
          w="320px"
          h="200px"
          bgImage="url(/images/rocket.webp)"
          bgPos="center"
          bgRepeat="no-repeat"
          objectFit="contain"
          cursor="pointer"
          borderRadius="10px"
        />
        <Text color="neutral" fontSize="20px">Nome do módulo</Text>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default LessonList;
