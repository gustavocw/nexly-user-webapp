import { Flex, HStack, Image, Text, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import TitlePage from "components/titlePage/titlePage";
import { VscShare } from "react-icons/vsc";
import { HiDownload } from "react-icons/hi";

const Certificate = () => {
  return (
    <VStack gap="32px" p={20} w="100%" align="flex-start">
      <TitlePage title="Exploração Espacial 101" />
      <HStack justify="space-between" w="100%">
        <Flex>
          <VStack
            borderWidth="1px"
            borderColor="neutral.40"
            borderRadius="8px"
            color="neutral"
            alignItems="center"
            justify="center"
            w="100px"
            h="32px"
          >
            <Text>#01010101</Text>
          </VStack>
          <Flex>
            <Text fontSize="22px" color="#F9F9F980">
              Certificação de conclusão:
            </Text>
            <Text fontSize="22px" color="neutral">
              Exploração Espacial 101
            </Text>
          </Flex>
        </Flex>
        <Flex gap="10px">
          <Btn
            w="200px"
            bg="transparent"
            iconLeft={<VscShare />}
            label="Compartilhar"
          />
          <Btn w="200px" iconLeft={<HiDownload />} label="Baixar" />
        </Flex>
      </HStack>
      <VStack
        justify="center"
        alignItems="center"
        bg="neutral.60"
        borderRadius="20px"
        w="100%"
        borderWidth="1px"
        borderColor="neutral.40"
        py="32px"
        px="10px"
      >
        <Image  src="/images/rocket.webp" w="900px" h="542px" />
      </VStack>
    </VStack>
  );
};

export default Certificate;
