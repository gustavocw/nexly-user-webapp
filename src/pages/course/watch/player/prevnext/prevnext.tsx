import { Flex, HStack, Icon, Separator, Text, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { GoStar } from "react-icons/go";
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";

interface PrevNextProps {
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  currentLessonName: string;
  nextLessonName?: string;
  prevLessonName?: string;
}

const PrevNext: React.FC<PrevNextProps> = ({
  onNext,
  onPrev,
  hasNext,
  hasPrev,
  nextLessonName,
  prevLessonName,
}) => {
  return (
    <HStack
      w="100%"
      bg="neutral.60"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      justify="space-between"
      py="32px"
      px="52px"
    >
      <Flex gap="32px" w="500px">
        <Icon cursor="pointer" color="neutral" fontSize="42px">
          <SlLike />
        </Icon>
        <Btn w="240px" bg="transparent" label="Marcar como concluído" />
        <Flex gap="32px">
          <Icon cursor="pointer" color="neutral" fontSize="42px">
            <SlDislike />
          </Icon>
          <Icon cursor="pointer" color="neutral" fontSize="42px">
            <GoStar />
          </Icon>
        </Flex>
      </Flex>
      <Flex gap="32px" w="500px">
        {hasPrev && (
          <Flex cursor="pointer" alignItems="center" gap="16px" onClick={onPrev}>
            <Icon cursor="pointer" color="orange" fontSize="48px">
              <CiCircleChevLeft />
            </Icon>
            <VStack gap={0} align="flex-start">
              <Text color="neutral.10" fontSize="12px">
                Anterior
              </Text>
              <Text color="neutral" fontSize="16px">
                {prevLessonName || "Nome do video"}
              </Text>
            </VStack>
          </Flex>
        )}
        {hasPrev && <Separator orientation="vertical" h="40px" my="auto" />}
        {hasNext && (
          <Flex cursor="pointer" alignItems="center" gap="16px" onClick={onNext}>
            <VStack gap={0} align="flex-end">
              <Text color="neutral.10" fontSize="12px">
                Próximo
              </Text>
              <Text color="neutral" fontSize="16px">
                {nextLessonName || "Nome do video"}
              </Text>
            </VStack>
            <Icon cursor="pointer" color="orange" fontSize="48px">
              <CiCircleChevRight />
            </Icon>
          </Flex>
        )}
      </Flex>
    </HStack>
  );
};

export default PrevNext;
