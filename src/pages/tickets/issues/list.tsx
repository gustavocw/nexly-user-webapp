import { Box, Text, VStack } from "@chakra-ui/react";
import Gestures from "components/motion/gesture";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { issuesList } from "./issues";
import { FreeMode, Pagination } from 'swiper/modules';

const ListIssues = () => {
  return (
    <VStack align="flex-start" w="90%">
      <Text color="neutral" fontSize="20px" mb={4}>
        Perguntas frequentes
      </Text>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        style={{ width: "100%" }}
      >
        {issuesList.map((ticket: any, index: number) => (
          <SwiperSlide style={{ display: "flex" }} key={index}>
            <Gestures>
              <Box
                borderRadius="8px"
                bg="neutral.60"
                p={4}
                shadow="md"
                cursor="pointer"
                w="340px"
                minH="180px"
                display="flex"
                flexDirection="column"
              >
                <Text color="neutral" fontSize="md" fontWeight="bold" mb={2}>
                  {ticket.question}
                </Text>
                <Text color="neutral.10" fontSize="sm">
                  {ticket.answer}
                </Text>
              </Box>
            </Gestures>
          </SwiperSlide>
        ))}
      </Swiper>
    </VStack>
  );
};

export default ListIssues;
