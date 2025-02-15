import { Box, Flex, Stack, Text, VStack } from "@chakra-ui/react";
import TitlePage from "components/titlePage/titlePage";
import Breadcrumb from "./breadcrumb/beadcrumb";
import VideoPlayer from "./player/player";
import PrevNext from "./player/prevnext/prevnext";
import { useState } from "react";
import CommentsVideo from "./comments/comments";
import LessonList from "./lessonlist/lessonlist";
import { useQuery } from "@tanstack/react-query";
import { getLessons, getUniqueLesson } from "services/course.services";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const { data: lessons } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessons(id!),
  });

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const currentLesson = lessons ? lessons[currentLessonIndex] : null;

  const { data: lesson, refetch: refetchLesson } = useQuery({
    queryKey: ["uniqueLesson", currentLesson?._id],
    queryFn: () => getUniqueLesson(currentLesson?._id),
    enabled: !!currentLesson,
  });

  const isFavorite = lesson?.some((res) => res.favoriteLesson) || false;
  const hasLike =
  lesson?.flatMap((l) => l.likeLesson || []).some((like) => like.type === "like") || false;

const hasDislike =
  lesson?.flatMap((l) => l.likeLesson || []).some((like) => like.type === "deslike") || false;

  console.log(isFavorite);

  const handleShow = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < (lessons?.length ?? 0) - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
    }
  };

  const nextLesson =
    lessons && currentLessonIndex < lessons.length - 1
      ? lessons[currentLessonIndex + 1]
      : null;
  const prevLesson =
    lessons && currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  console.log(lesson);

  return (
    <VStack align="flex-start" py={20} w="100%">
      <VStack py={5} gap={0} mx="auto" align="flex-start" w="90%">
        <TitlePage title={currentLesson?.nameLesson || "Aula"} />
        <Flex w="100%" pl={{ base: 2, md: 10 }}>
          <Breadcrumb
            lessonId={currentLesson?._id}
            lesson={lessons}
            onSelectLesson={setCurrentLessonIndex}
          />
        </Flex>
      </VStack>
      <VideoPlayer videoUrl={currentLesson?.urlVideo || ""} />
      <PrevNext
        hasLike={hasLike}
        hasDislike={hasDislike}
        refetchLesson={refetchLesson}
        lessonFav={isFavorite}
        lesson={currentLesson}
        onNext={handleNextLesson}
        onPrev={handlePrevLesson}
        hasNext={currentLessonIndex < (lessons?.length ?? 0) - 1}
        hasPrev={currentLessonIndex > 0}
        currentLessonName={currentLesson?.nameLesson || ""}
        nextLessonName={nextLesson?.nameLesson}
        prevLessonName={prevLesson?.nameLesson}
      />

      <Stack
        flexDirection={{ base: "column-reverse", md: "row" }}
        align="flex-start"
        px={{ base: 2, md: 20 }}
        py={10}
        gap="64px"
        w="100%"
      >
        <VStack gap="32px" w={{ base: "100%", md: "70%" }}>
          <Box
            w="100%"
            bg="neutral.60"
            boxShadow="0px 1px 3px 0px #0000004D, 0px 4px 8px 3px #00000026"
            py="8px"
            px="16px"
          >
            <Text color="neutral.10" fontWeight="bold" mb={2}>
              Descrição da Lição:
            </Text>
            <Text color="neutral.10">
              {isOpen
                ? currentLesson?.description
                : truncateText(currentLesson?.description || "", 100)}{" "}
            </Text>
            {currentLesson?.description &&
              currentLesson.description.length > 100 && (
                <Text
                  onClick={handleShow}
                  cursor="pointer"
                  color="primary.50"
                  fontWeight="bold"
                  mt={2}
                >
                  {isOpen ? "Mostrar Menos" : "Mostrar Mais"}
                </Text>
              )}
          </Box>
          <CommentsVideo
            lessonId={currentLesson?._id}
            lesson={lesson}
            refetchLesson={refetchLesson}
          />
        </VStack>
        <Stack
          flexDirection="column"
          maxH={{ base: "220px", md: "700px" }}
          overflowY={{ base: "", md: "auto" }}
          overflowX="hidden"
          align="center"
          w={{ base: "100%", md: "40%" }}
          justify={{ base: "center", md: "flex-start" }}
        >
          <Text
            display={{ base: "flex", md: "none" }}
            color="white"
            fontSize="14px"
            fontWeight="bold"
          >
            Próximas aulas
          </Text>
          <LessonList
            lessons={lessons}
            currentLessonIndex={currentLessonIndex}
            onSelectLesson={(index: number) => setCurrentLessonIndex(index)}
          />
        </Stack>
      </Stack>
    </VStack>
  );
};

export default Watch;
