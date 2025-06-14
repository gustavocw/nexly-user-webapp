import { Flex, Icon, Separator, Stack, Text, VStack } from "@chakra-ui/react";
import Btn from "components/button/button";
import { SlLike } from "react-icons/sl";
import { SlDislike } from "react-icons/sl";
import { GoStar } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { CiCircleChevRight } from "react-icons/ci";
import { CiCircleChevLeft } from "react-icons/ci";
import { useControllerVideo } from "./controller";
import useAuthStore from "stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { saveProgress } from "services/course.services";
import useCourseStore from "stores/course.store";

interface PrevNextProps {
  lesson?: Lesson | null;
  onNext: () => void;
  onPrev: () => void;
  refetchLesson: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  lessonFav: boolean;
  hasLike: boolean;
  hasDislike: boolean;
  currentLessonName: string;
  nextLessonName?: string;
  prevLessonName?: string;
}

const PrevNext: React.FC<PrevNextProps> = ({
  lesson,
  onNext,
  onPrev,
  hasNext,
  lessonFav,
  hasPrev,
  hasLike,
  hasDislike,
  nextLessonName,
  prevLessonName,
  refetchLesson,
}) => {
  const { mutateFavorite, mutateLike } = useControllerVideo({ refetchLesson });
  const { area } = useAuthStore();
  const { courseId } = useCourseStore();

  const { mutate: markProgress } = useMutation({
    mutationKey: ["markProgress"],
    mutationFn: () => saveProgress(lesson?._id, courseId),
  });

  // const {data} = useQuery({
  //   queryKey: ["lesson", lesson?._id],
  //   queryFn: () => http.get(`/member/progress/${courseId}`,),
  // })

  return (
    <Stack
      w="100%"
      bg="neutral.60"
      boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
      justify="space-between"
      py={{ base: "16px", md: "32px" }}
      px={{ base: "16px", md: "52px" }}
      flexDirection={{ base: "column", md: "row" }}
      gap="32px"
    >
      <Flex
        gap={{ base: "16px", md: "32px" }}
        w={{ base: "100%", md: "500px" }}
        alignItems="center"
        justify={{ base: "space-between", md: "center" }}
      >
        <Icon
          cursor="pointer"
          color={hasLike ? area?.color : "neutral"}
          fontSize={{ base: "20px", md: "32px" }}
          onClick={() => {
            mutateLike({
              lessonId: lesson?._id,
              type: "like",
            });
          }}
        >
          <SlLike />
        </Icon>

        <Btn
          fontSize={{ base: "14px", md: "16px" }}
          w={{ base: "200px", md: "240px" }}
          bg="transparent"
          label="Marcar como concluído"
          onClick={() => markProgress()}
        />

        <Flex gap={{ base: "16px", md: "32px" }}>
          <Icon
            cursor="pointer"
            color={hasDislike ? area?.color : "neutral"}
            fontSize={{ base: "20px", md: "32px" }}
            onClick={() => {
              mutateLike({
                lessonId: lesson?._id,
                type: "deslike",
              });
            }}
          >
            <SlDislike />
          </Icon>

          {/* Ícone de Favorito */}
          {lessonFav === true ? (
            <Icon
              onClick={() => mutateFavorite(lesson?._id)}
              cursor="pointer"
              color="yellow.400"
              fontSize={{ base: "20px", md: "32px" }}
            >
              <GoStarFill />
            </Icon>
          ) : (
            <Icon
              onClick={() => mutateFavorite(lesson?._id)}
              cursor="pointer"
              color="neutral"
              fontSize={{ base: "20px", md: "32px" }}
            >
              <GoStar />
            </Icon>
          )}
        </Flex>
      </Flex>

      <Flex
        gap={{ base: "16px", md: "32px" }}
        w="auto"
        justify={{ base: "space-between", md: "center" }}
      >
        <Flex
          cursor={hasPrev ? "pointer" : "default"}
          alignItems="center"
          gap={{ base: "8px", md: "16px" }}
          onClick={hasPrev ? onPrev : undefined}
          opacity={hasPrev ? 1 : 0.5}
          w="auto"
        >
          <Icon
            cursor={hasPrev ? "pointer" : "default"}
            color={area?.color}
            fontSize={{ base: "32px", md: "48px" }}
          >
            <CiCircleChevLeft />
          </Icon>
          <VStack gap={0} align="flex-start">
            <Text color="neutral.10" fontSize={{ base: "14px", md: "12px" }}>
              Anterior
            </Text>
            <Text color="neutral" fontSize={{ base: "15px", md: "16px" }}>
              {hasPrev ? prevLessonName : "Nenhum"}
            </Text>
          </VStack>
        </Flex>
        <Separator
          orientation="vertical"
          h={{ base: "20px", md: "40px" }}
          my="auto"
        />
        {hasNext ? (
          <Flex
            cursor="pointer"
            alignItems="center"
            gap={{ base: "8px", md: "16px" }}
            onClick={onNext}
          >
            <VStack gap={0} align="flex-end">
              <Text color="neutral.10" fontSize={{ base: "14px", md: "12px" }}>
                Próximo
              </Text>
              <Text color="neutral" fontSize={{ base: "15px", md: "16px" }}>
                {nextLessonName || "Nome do vídeo"}
              </Text>
            </VStack>
            <Icon
              cursor="pointer"
              color={area?.color}
              fontSize={{ base: "32px", md: "48px" }}
            >
              <CiCircleChevRight />
            </Icon>
          </Flex>
        ) : (
          <Flex
            cursor="default"
            alignItems="center"
            gap={{ base: "8px", md: "16px" }}
            opacity={0.5}
          >
            <VStack gap={0} align="flex-end">
              <Text color="neutral.10" fontSize={{ base: "14px", md: "12px" }}>
                Próximo
              </Text>
              <Text color="neutral" fontSize={{ base: "15px", md: "16px" }}>
                Nenhum
              </Text>
            </VStack>
            <Icon
              cursor="default"
              color={area?.color}
              fontSize={{ base: "32px", md: "48px" }}
            >
              <CiCircleChevRight />
            </Icon>
          </Flex>
        )}
      </Flex>
    </Stack>
  );
};

export default PrevNext;
