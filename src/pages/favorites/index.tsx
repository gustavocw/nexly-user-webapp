import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import { SimpleGrid } from "@chakra-ui/react";
import { GoStarFill } from "react-icons/go";

const Favorites = () => {
  return (
    <VStack p={20} w="100%" align="flex-start">
      <TitlePage title="Favoritos" />
      <SimpleGrid columns={[2, null, 3]} gap="40px">
        <Box
          bgImage="url(/images/rocket.webp)"
          bgSize="cover"
          bgRepeat="no-repeat"
          position="relative"
          cursor="pointer"
          w="320px"
          h="160px"
        >
          <Flex
            px={2}
            w="100%"
            position="absolute"
            justify="flex-end"
            p={2}
          >
            <Icon cursor="pointer" color="yellow" fontSize="20px">
              <GoStarFill />
            </Icon>
          </Flex>
          <Flex
            bg="linear-gradient(0deg, #101010 0%, rgba(16, 16, 16, 0) 100%);"
            px={2}
            w="100%"
            bottom={0}
            position="absolute"
            justify="space-between"
          >
            <Text color="neutral">Aulas 1 - Introdução</Text>
            <Text color="neutral">40:10</Text>
          </Flex>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default Favorites;
