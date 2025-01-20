import { Box, VStack } from "@chakra-ui/react";

interface CardProductProps {
  productName: string;
  productImage: string;
  format: "VERTICAL_RECT" | "HORIZONTAL_RECT" | "SQUARE" | "VERTICAL_RECT_MAX";
}

const formatStyles: Record<
  "VERTICAL_RECT" | "HORIZONTAL_RECT" | "SQUARE" | "VERTICAL_RECT_MAX",
  { width: string; height: string }
> = {
  VERTICAL_RECT: { width: "208px", height: "310px" },
  HORIZONTAL_RECT: { width: "310px", height: "208px" },
  SQUARE: { width: "300px", height: "300px" },
  VERTICAL_RECT_MAX: { width: "180px", height: "270px" },
};

const CardProduct: React.FC<CardProductProps> = ({ productImage, format }) => {
  const currentStyle = formatStyles[format] || { width: "0px", height: "0px" };

  return (
    <VStack py={10} align="flex-start" w="100%">
      <Box
        {...currentStyle}
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
