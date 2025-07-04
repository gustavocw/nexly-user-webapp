import { Text, VStack, Icon, Flex, Box } from "@chakra-ui/react";
import BackgroundHome from "components/HomeBg/HomeBackground";
import { FaCircleExclamation } from "react-icons/fa6";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "components/ui/progress";
import Btn from "components/button/button";
import CardProduct from "./cards/cards";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import useAuthStore from "stores/auth.store";
import { Navigation, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getArea } from "services/area.services";
import { returnProgress } from "services/course.services";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { setArea, area: storedArea } = useAuthStore();
  const [boxWidth, setBoxWidth] = useState("40%");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const rawUrl = window.location.hostname;
  const url = rawUrl === "localhost" ? "costaweb.dev.br" : rawUrl;
  const navigate = useNavigate();

  const { data: progress, refetch } = useQuery({
    queryKey: ["progress"],
    queryFn: async () => {
      const result = returnProgress(storedArea?.courses[0]?._id);
      return result;
    },
  });

  const { data: area } = useQuery({
    queryKey: ["area", url],
    queryFn: async () => {
      const res = await getArea(url);
      setArea(res);
      refetch();
      return res;
    },
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      const calculatedWidth = Math.min(
        40 + (100 - (innerWidth / 1920) * 100),
        100
      );
      setBoxWidth(`${calculatedWidth}%`);
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box h="100%" pb={{ base: 20, md: 0 }} w="100%">
      <BackgroundHome backgroundUrl={area?.background}>
        <Flex
          bg="linear-gradient(0deg, #1F1D22 0%, rgba(16, 18, 26, 0) 100%)"
          justify="space-between"
          alignItems="flex-end"
          w="100%"
          h="100%"
        >
          <VStack
            gap="16px"
            align="flex-start"
            maxW={{ base: "100%", md: "100%", lg: boxWidth }}
            px={{ base: 4, md: 20 }}
            py={{ base: 4, md: 12 }}
            color="#fff"
          >
            <Flex gap={2} w="60%">
              <Icon color={area?.color}>
                <FaCircleExclamation />
              </Icon>
              <Text fontSize="14px" fontWeight="bold">
                Receba seu certificado após a conclusão das aulas
              </Text>
            </Flex>
            {progress?.length > 0 && progress[0]?.percent_progress > 0 && (
              <Flex gap={2} w={{ base: "60%", md: "50%" }}>
                <ProgressRoot
                  display="flex"
                  gap={2}
                  alignItems="center"
                  w="100%"
                  defaultValue={progress[0]?.percent_progress}
                  min={0}
                  max={100}
                  orientation="horizontal"
                >
                  <ProgressValueText>
                    {progress[0]?.percent_progress}%
                  </ProgressValueText>
                  <ProgressBar bg={area?.color} borderRadius="50px" w="100%" />
                </ProgressRoot>
              </Flex>
            )}
            <Text fontSize={{ base: "16px", md: "18px", lg: "28px" }}>
              {area?.title}
            </Text>
            <Text maxW={{ base: "100%", md: "70%" }} fontSize="14px">
              {area?.description}
            </Text>
            {progress?.length > 0 && progress[0]?.percent_progress > 0 && (
              <Btn
                label="Continuar de onde eu parei"
                bg={area?.color}
                w="260px"
                _hover={{ bg: area?.color }}
                borderRadius="50px"
                borderColor="#fff"
                onClick={() => {
                  navigate(`watch/${progress[0]?.idLesson}`);
                }}
              />
            )}
          </VStack>
        </Flex>
      </BackgroundHome>
      <Flex px={1} w="90%" mx="auto">
        <Text color="neutral" fontSize="20px">
          Meus produtos
        </Text>
      </Flex>
      <Swiper
        slidesPerView={2}
        spaceBetween={80}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 80,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 40,
          },
        }}
        modules={[Pagination, Navigation]}
        navigation={isDesktop}
        style={{ width: "90%" }}
      >
        {area?.courses.map((course) => (
          <>
            <SwiperSlide key={course._id}>
              <CardProduct course={course} />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
    </Box>
  );
};

export default Home;
