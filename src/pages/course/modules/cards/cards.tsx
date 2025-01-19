import { Box, Flex, Text } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

interface CardLessonsProps {
  lessons: any[];
  format: "VERTICAL_RECT" | "HORIZONTAL_RECT" | "SQUARE" | "VERTICAL_RECT_MAX";
}

const formatStyles: Record<
  CardLessonsProps["format"],
  { width: string; height: string }
> = {
  VERTICAL_RECT: { width: "208px", height: "306px" },
  HORIZONTAL_RECT: { width: "320px", height: "190px" },
  SQUARE: { width: "300px", height: "300px" },
  VERTICAL_RECT_MAX: { width: "280px", height: "406px" },
};

const defaultStyle = formatStyles.VERTICAL_RECT;

const CardLessons: React.FC<CardLessonsProps> = ({ lessons, format }) => {
  const style = formatStyles[format] || defaultStyle;

  return (
    <CarouselProvider
      naturalSlideWidth={16}
      naturalSlideHeight={18}
      totalSlides={lessons.length}
      visibleSlides={5}
      infinite
    >
      <Flex position="relative" justify="space-between" align="center" mb={4}>
        <ButtonBack style={{ background: "none", border: "none" }}>
          Back
        </ButtonBack>
        <ButtonNext style={{ background: "none", border: "none" }}>
          Next
        </ButtonNext>
      </Flex>
      <Slider style={{ width: "100vw" }}>
        {lessons.map((lesson: any, index: number) => (
          <Slide key={lesson.id || index} index={index}>
            <Flex px={2} py="30px" align="flex-start" w="100%">
              <Gestures>
                <Box
                  {...style}
                  borderRadius="4px"
                  bgImage={`url(${lesson.thumbnail})`}
                  bgSize="cover"
                  bgRepeat="no-repeat"
                  bgPos="center"
                  position="relative"
                  cursor="pointer"
                  w={{ base: "188px", md: style.width }}
                  h={{ base: "280px", md: style.height }}
                  mx={2}
                  onClick={() => console.log("opa")}
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
            </Flex>
          </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  );
};

export default CardLessons;
