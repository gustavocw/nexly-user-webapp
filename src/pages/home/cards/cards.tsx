import { Box, Text, VStack } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";

interface CardProductProps {
  productName: string;
  productImage: string;
}

const defaultStyle = { width: "208px", height: "310px" };

const CardProduct: React.FC<CardProductProps> = ({
  productName,
  productImage,
}) => {
  return (
    <VStack py={10} align="flex-start" w="100%">
      <Gestures>
        <Box
          {...defaultStyle}
          borderRadius="4px"
          bgImage={`url(${productImage})`}
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
            <Text fontSize="sm">{productName}</Text>
          </Box>
        </Box>
      </Gestures>
    </VStack>
  );
};

export default CardProduct;
