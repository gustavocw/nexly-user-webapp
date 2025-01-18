import { Box, Text, VStack } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";

interface CardModulesProps {
  module: Module | any
}

const defaultStyle = { width: "208px", height: "310px" };

const CardModules: React.FC<CardModulesProps> = ({
  module,
}) => {
  return (
    <VStack py={10} align="flex-start" w="100%">
      <Gestures>
        <Box
          {...defaultStyle}
          borderRadius="4px"
          bgImage={`url(${module.thumbnail})`}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPos="center"
          position="relative"
          cursor="pointer"
          w={{ base: "188px", md: defaultStyle.width }}
          h={{ base: "280px", md: defaultStyle.height }}
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

export default CardModules;
