import { Box, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import { SimpleGrid } from "@chakra-ui/react";
import { GoStarFill } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "services/course.services";
import { GoStar } from "react-icons/go";

const Favorites = () => {
  const {data: favorites} = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getFavorites(),
  })

  console.log(favorites);
  
  return (
    <VStack px={{ base: 2, md: 20 }} py={20} w="100%" align="flex-start">
      <TitlePage title="Favoritos" />
      {favorites && favorites.length > 0 ? (
        <SimpleGrid columns={[2, null, 3]} gap="40px">
          {favorites.map((favorite: any) => (
            <Box
              key={favorite?._id}
              bgImage={`url(${favorite.image})`}
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
                <Text color="neutral">{favorite.title}</Text>
                <Text color="neutral">{favorite.duration}</Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <VStack
        w="100%"
        py="32px"
        px="10px"
        gap="20px"
        boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      >
        <Icon fontSize="38px" color="neutral">
          <GoStar />
        </Icon>
        <VStack gap="32px" lineHeight={1.5} w="100%">
          <Text textAlign="center" fontSize="24px" color="neutral">
            Você ainda não possui nenhum favorito.
          </Text>
        </VStack>
      </VStack>
      )}
    </VStack>
  );
};

export default Favorites;
