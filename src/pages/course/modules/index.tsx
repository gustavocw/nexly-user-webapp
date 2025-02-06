import { Text, VStack, Icon, Flex, Box } from "@chakra-ui/react";
import { FaCircleExclamation } from "react-icons/fa6";
import {
  ProgressBar,
  ProgressRoot,
  ProgressValueText,
} from "components/ui/progress";
import Btn from "components/button/button";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoBackground from "components/videobg/videobg";
import { useQuery } from "@tanstack/react-query";
import { getCourse, getLessons } from "services/course.services";
import CardModule from "./card/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import useAuthStore from "stores/auth.store";

const Course = () => {
  const [boxWidth, setBoxWidth] = useState("40%");
  const { id } = useParams();
  const { area } = useAuthStore();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

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
  const { data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => {
      return getCourse(id);
    },
  });

  const { data: lessons } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => getLessons(courses[0]?.modules[0]?._id!),
  });

  console.log(lessons);

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      const calculatedWidth = Math.min(
        40 + (100 - (innerWidth / 1920) * 100),
        100
      );
      setBoxWidth(`${calculatedWidth}%`);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box h="100vh" w="100%">
      <VideoBackground
        videoUrl={
          lessons?.length
            ? lessons[0]?.urlVideo
            : "https://www.youtube.com/watch?v=Ttl8Gg-P-Ao"
        }
      >
        <Flex
          background="linear-gradient(0deg, #10121A 0%, rgba(16, 18, 26, 0) 100%)"
          justify="space-between"
          w="100%"
        >
          {courses?.map((course: any) => (
            <VStack
              key={course.id}
              gap="16px"
              align="flex-start"
              maxW={{ base: "100%", md: "100%", lg: boxWidth }}
              p={{ base: 4, md: 10 }}
            >
              <Flex gap={2} w="100%">
                <Icon color={area?.color}>
                  <FaCircleExclamation />
                </Icon>
                <Text whiteSpace="nowrap" fontSize="14px" fontWeight="bold">
                  {course.name}
                </Text>
              </Flex>
              <Flex gap={2} w="100%">
                <ProgressRoot
                  colorPalette={area?.color}
                  display="flex"
                  gap={2}
                  alignItems="center"
                  w="100%"
                  maxW="400px"
                  defaultValue={40}
                  min={0}
                  max={100}
                  orientation="horizontal"
                >
                  <ProgressValueText>40%</ProgressValueText>
                  <ProgressBar bg="#00000066" borderRadius="50px" w="100%" />
                </ProgressRoot>
              </Flex>
              <Text fontSize={{ base: "16px", md: "20px", lg: "32px" }}></Text>
              <Text fontSize="16px">{course.description}</Text>
              <Btn
                label="Continuar de onde eu parei"
                bg={area?.color}
                w="260px"
                _hover={{
                  bg: area?.color,
                }}
                borderRadius="50px"
              />
            </VStack>
          ))}
        </Flex>
      </VideoBackground>
      <Box
        w="100%"
        px={10}
        background="linear-gradient(180deg, #10121A 0%, rgba(16, 18, 26, 0) 100%)"
      >
        {courses?.map((course: any) =>
          course.modules?.map((module: any) => (
            <Swiper
              slidesPerView={2}
              spaceBetween={120}
              pagination={{ clickable: true }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 120,
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
              style={{ width: "100%" }}
            >
              <>
                <SwiperSlide key={course._id}>
                  <CardModule
                    key={module._id}
                    format={module.format}
                    module={module}
                  />
                </SwiperSlide>
              </>
            </Swiper>
          ))
        )}
      </Box>
    </Box>
  );
};

export default Course;
