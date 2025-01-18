import { Box, Text, VStack } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";

interface CardLessonsProps {
  lesson: Lesson | any;
  format: "VERTICAL_RECT" | "HORIZONTAL_RECT" | "SQUARE" | "VERTICAL_RECT_MAX";
}

const formatStyles: Record<
  CardLessonsProps["format"],
  { width: string; height: string }
> = {
  VERTICAL_RECT: { width: "208px", height: "210px" },
  HORIZONTAL_RECT: { width: "130px", height: "50px" },
  SQUARE: { width: "100px", height: "100px" },
  VERTICAL_RECT_MAX: { width: "50px", height: "100px" },
};

const defaultStyle = formatStyles.VERTICAL_RECT;

const CardLessons: React.FC<CardLessonsProps> = ({ lesson, format }) => {
  const style = formatStyles[format] || defaultStyle;

  return (
    <VStack py={10} align="flex-start" w="100%">
      <Gestures>
        <Box
          {...style}
          borderRadius="4px"
          bgImage={`url(${lesson.thumbnail})`}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPos="center"
          position="relative"
          cursor="pointer"
          w={{ base: "188px", md: style.width }}
          h={{ base: "280px", md: style.height }}
          mx={2}
        >
          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            bg="rgba(0, 0, 0, 0.5)"
            color="white"
            p={2}
          >
            <Text fontSize="sm">{lesson.nameLesson}</Text>
          </Box>
        </Box>
      </Gestures>
    </VStack>
  );
};

export default CardLessons;
