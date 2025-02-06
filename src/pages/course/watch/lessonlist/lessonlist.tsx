import {
  Box,
  Flex,
  Text,
  Icon,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { FaClock } from "react-icons/fa";
import { truncateText } from "utils/truncate";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

interface LessonListProps {
  lessons?: Lesson[];
  onSelectLesson: (index: number) => void;
  currentLessonIndex: number;
}

const LessonList: React.FC<LessonListProps> = ({
  lessons,
  onSelectLesson,
  currentLessonIndex,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <VStack h={{ base: "250px", md: "700px" }} align="flex-start" py={5}>
      {isMobile ? (
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {lessons?.map((lesson, index) => (
            <Box>
              <SwiperSlide key={lesson._id}>
                <Box
                  w="320px"
                  h="200px"
                  bgImage={`url(${lesson.thumbnail || "/images/bg2.png"})`}
                  bgSize="cover"
                  bgPos="center"
                  borderRadius="10px"
                  cursor="pointer"
                  position="relative"
                  onClick={() => onSelectLesson(index)}
                >
                  {index === currentLessonIndex && (
                    <Flex
                      position="absolute"
                      top="8px"
                      right="8px"
                      bg="rgba(0, 0, 0, 0.6)"
                      p="4px"
                      borderRadius="50%"
                      align="center"
                      justify="center"
                    >
                      <Icon as={FaClock} color="white" boxSize={4} />
                    </Flex>
                  )}

                  <Flex
                    position="absolute"
                    bottom="0"
                    w="100%"
                    bg="rgba(0, 0, 0, 0.6)"
                    p="8px"
                    justify="space-between"
                    align="center"
                    borderBottomRadius="10px"
                  >
                    <Text color="white" fontSize="14px" fontWeight="bold">
                      {truncateText(lesson.nameLesson, 20)}
                    </Text>
                    {index === currentLessonIndex && (
                      <Text
                        color="orange.300"
                        fontSize="12px"
                        fontWeight="bold"
                      >
                        Reproduzindo agora
                      </Text>
                    )}
                  </Flex>
                </Box>
              </SwiperSlide>
            </Box>
          ))}
        </Swiper>
      ) : (
        lessons?.map((lesson, index) => (
          <Box
            key={lesson._id}
            w="320px"
            h="200px"
            bgImage={`url(${lesson.thumbnail || "/images/bg2.png"})`}
            bgSize="cover"
            bgPos="center"
            borderRadius="10px"
            cursor="pointer"
            position="relative"
            onClick={() => onSelectLesson(index)}
          >
            {index === currentLessonIndex && (
              <Flex
                position="absolute"
                top="8px"
                right="8px"
                bg="rgba(0, 0, 0, 0.6)"
                p="4px"
                borderRadius="50%"
                align="center"
                justify="center"
              >
                <Icon as={FaClock} color="white" boxSize={4} />
              </Flex>
            )}

            <Flex
              position="absolute"
              bottom="0"
              w="100%"
              bg="rgba(0, 0, 0, 0.6)"
              p="8px"
              justify="space-between"
              align="center"
              borderBottomRadius="10px"
            >
              <Text color="white" fontSize="14px" fontWeight="bold">
                {truncateText(lesson.nameLesson, 20)}
              </Text>
              {index === currentLessonIndex && (
                <Text color="orange.300" fontSize="12px" fontWeight="bold">
                  Reproduzindo agora
                </Text>
              )}
            </Flex>
          </Box>
        ))
      )}
    </VStack>
  );
};

export default LessonList;
