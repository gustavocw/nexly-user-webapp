import { Box, Flex, HStack, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import { SimpleGrid } from "@chakra-ui/react";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "components/ui/progress";
import { useNavigate } from "react-router-dom";
import useAuthStore from "stores/auth.store";

const Certificates = () => {
  const navigate = useNavigate();
  const { area } = useAuthStore();

  return (
    <VStack
      py={20}
      px={{ base: 2, md: 20 }}
      w="100%"
      align={{ base: "center", md: "flex-start" }}
    >
      <Flex w="100%" justify="flex-start">
        <TitlePage title="Selecione o curso desejado" />
      </Flex>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="40px">
        {area?.courses.map((course) => (
          <>
            <VStack
              onClick={() => navigate(`/certificate/${course?._id}`)}
              h="180px"
              w="350px"
            >
              <Box
                bgImage={`url(${course?.thumbnail})`}
                bgSize="cover"
                bgRepeat="no-repeat"
                position="relative"
                cursor="pointer"
                w="350px"
                h="180px"
              />
              <ProgressRoot defaultValue={40} w="100%">
                <HStack alignItems="center" gap="5">
                  <ProgressValueText color="neutral" fontSize="16px">
                    40%
                  </ProgressValueText>
                  <ProgressBar bg="#1A1A1A" borderRadius="10px" flex="1" />
                </HStack>
              </ProgressRoot>
            </VStack>
          </>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Certificates;
