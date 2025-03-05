import { Box, Text, VStack } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";
import { useNavigate } from "react-router-dom";

interface CardModuleProps {
  module: Module;
  format: "VERTICAL_RECT" | "HORIZONTAL_RECT" | "SQUARE" | "VERTICAL_RECT_MAX";
}

const formatStyles: Record<
  CardModuleProps["format"],
  { width: string; height: string }
> = {
  VERTICAL_RECT: { width: "208px", height: "306px" },
  HORIZONTAL_RECT: { width: "320px", height: "190px" },
  SQUARE: { width: "300px", height: "300px" },
  VERTICAL_RECT_MAX: { width: "280px", height: "406px" },
};

const defaultStyle = formatStyles.VERTICAL_RECT;

const CardModule: React.FC<CardModuleProps> = ({ module, format }) => {
  const style = formatStyles[format] || defaultStyle;
  const navigate = useNavigate();

  return (
    <VStack py={10} align="flex-start" w="100%">
      <Gestures>
        <Box
          width={{ base: style.width, md: style.width }}
          height={{ base: style.height, md: style.height }}
          borderRadius="4px"
          bgImage={`url(${module.thumbnail})`}
          bgSize="cover"
          bgRepeat="no-repeat"
          bgPos="center"
          position="relative"
          cursor="pointer"
          onClick={() =>
            navigate(`/watch/${module?._id}`, {
              state: { course: module },
            })
          }
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
            <Text fontSize="sm">{module.name}</Text>
          </Box>
        </Box>
      </Gestures>
    </VStack>
  );
};

export default CardModule;
