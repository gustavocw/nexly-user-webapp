import { Box, Text, VStack, Icon } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineVideoLibrary,
  MdOutlineCollectionsBookmark,
} from "react-icons/md";
import useCourseStore from "stores/course.store";

interface CardProductProps {
  course: Course | any;
}

const defaultStyle = { width: "208px", height: "310px" };

const CardProduct: React.FC<CardProductProps> = ({ course }) => {
  const { setCourseId } = useCourseStore();
  const navigate = useNavigate();
  const courseIcon =
    course.type === "video"
      ? MdOutlineVideoLibrary
      : MdOutlineCollectionsBookmark;

  return (
    <VStack py={10} align="flex-start" w="100%">
      <Gestures>
        <Box
          {...defaultStyle}
          borderRadius="4px"
          bgImage={`url(${course.thumbnail})`}
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPos="center"
          position="relative"
          cursor="pointer"
          w={{ base: "188px", md: defaultStyle.width }}
          h={{ base: "280px", md: defaultStyle.height }}
          onClick={() => {
            setCourseId(course?._id);
            navigate(`/course/${course?._id}`, {
              state: { course: course },
            });
          }}
          mx={2}
        >
          <Icon
            as={courseIcon}
            position="absolute"
            top="8px"
            left="8px"
            fontSize="38px"
            color="white"
            bg="rgba(0, 0, 0, 0.6)"
            p={2}
            borderRadius="50%"
          />

          <Box
            position="absolute"
            bottom="0"
            left="0"
            width="100%"
            bg="rgba(0, 0, 0, 0.5)"
            color="white"
            p={2}
          >
            <Text fontSize="sm">{course.name}</Text>
          </Box>
        </Box>
      </Gestures>
    </VStack>
  );
};

export default CardProduct;
