import { Text, VStack, Flex, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VideoBackground from "components/videobg/videobg";
import { useQuery } from "@tanstack/react-query";
import { getCourse, getLessons } from "services/course.services";
import CardModule from "./CardModules/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";

const Course = () => {
  const [boxWidth, setBoxWidth] = useState("40%");
  const { id } = useParams();
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

  console.log(courses);
  

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
              h={{ base: "200px", md: "auto" }}
              overflowY="auto"
              p={{ base: 4, md: 10 }}
            >
              <Text whiteSpace="nowrap" fontSize={{ base: "16px", md: "22px" }} fontWeight="400">
                {course.name}
              </Text>
              <Text fontSize="16px">{course.description}</Text>
            </VStack>
          ))}
        </Flex>
      </VideoBackground>
      <Box
        w="100%"
        px={{ base: 4, md: 10 }}
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
