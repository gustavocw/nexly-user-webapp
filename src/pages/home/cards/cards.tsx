import { Box, VStack } from "@chakra-ui/react";

interface CardProductProps {
  productName: string;
  productImage: string;
}

const defaultStyle = { width: "208px", height: "310px" };

const CardProduct: React.FC<CardProductProps> = ({ productImage }) => {
  return (
    <VStack py={10} align="flex-start" w="100%">
      <Box
        {...defaultStyle}
        borderRadius="4px"
        bgImage={`url(${productImage})`}
        bgSize="contain"
        bgRepeat="no-repeat"
        bgPos="center"
        position="relative"
        cursor="pointer"
      />
    </VStack>
  );
};

export default CardProduct;
