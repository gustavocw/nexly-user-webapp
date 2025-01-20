import { Box, HStack, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import { SimpleGrid } from "@chakra-ui/react";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "components/ui/progress";
import { useNavigate } from "react-router-dom";

const Certificates = () => {
  const navigate = useNavigate();
  return (
    <VStack p={20} w="100%" align="flex-start">
      <TitlePage title="Selecione o curso desejado" />
      <SimpleGrid columns={[2, null, 3]} gap="40px">
        <VStack
          onClick={() => navigate(`/certificate/${123}`)}
          h="180px"
          w="350px"
        >
          <Box
            bgImage="url(/images/rocket.webp)"
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
      </SimpleGrid>
    </VStack>
  );
};

export default Certificates;
