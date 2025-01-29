import { Box, Flex, Icon, Input, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import { PiChats } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { useMutation } from "@tanstack/react-query";
import { commentLesson } from "services/course.services";
import { toaster } from "components/ui/toaster";
import { useState } from "react";

interface CommentsProps {
  lessonId?: string;
  lesson?: Lesson[];
  refetchLesson: () => void;
}

const CommentsVideo: React.FC<CommentsProps> = ({ lessonId, lesson, refetchLesson }) => {
  if (typeof lessonId !== 'string' || !lessonId) {
    console.error('Invalid lessonId');
    return null;
  }
  const [comment, setComment] = useState("");

  const { mutate: sendComment } = useMutation({
    mutationFn: (comment: string) => commentLesson(lessonId, comment),
    onSuccess: () => {
      refetchLesson();
      toaster.create({
        title: "Comentário feito com sucesso.",
        type: "success",
      });
      setComment("");
    },
  });

  const handleSendComment = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      (event as React.KeyboardEvent).key === "Enter" ||
      (event as React.MouseEvent).type === "click"
    ) {
      sendComment(comment);
    }
  };

  const handleReply = (username: string) => {
    setComment(`@${username} `);
  };

  return (
    <VStack gap="32px" align="flex-start" w="100%">
      <Flex gap="10px" alignItems="center">
        <Icon fontSize="16px" color="neutral">
          <PiChats />
        </Icon>
        <Text color="neutral" fontSize="16px">
          Comentários
        </Text>
      </Flex>
      <Flex w="100%" gap="10px" alignItems="center">
        <Avatar src="" w="50px" h="50px" />
        <Flex w="100%" alignItems="center" position="relative">
          <Input
            w="100%"
            variant="flushed"
            placeholder="Escrever comentário"
            color="neutral"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleSendComment}
          />
          <Icon
            as={IoMdSend}
            position="absolute"
            right="0"
            cursor="pointer"
            color="neutral"
            onClick={handleSendComment}
          />
        </Flex>
      </Flex>
      <VStack align="flex-start" w="100%">
        {lesson?.map((unique) =>
          unique.comments?.map((comment) => (
            <Flex key={comment._id} w="100%" gap="10px">
              <Avatar src={comment.userPhoto} w="32px" h="32px" />
              <Box w="100%">
                <Flex>
                  <Text color="neutral.10">{comment.name} • Há 12 horas</Text>
                </Flex>
                <Text fontSize="16px" color="neutral">
                  {comment.comment}
                </Text>
                <Flex my={2} alignItems="center" gap="16px">
                  <Icon cursor="pointer" fontSize="20px" color="neutral">
                    <BiLike />
                  </Icon>
                  <Text
                    cursor="pointer"
                    fontSize="16px"
                    color="neutral"
                    onClick={() => handleReply(comment.name)}
                  >
                    Responder
                  </Text>
                </Flex>
                {comment.replies?.length > 0 && (
                  <Flex cursor="pointer" gap="10px" alignItems="center">
                    <Text fontSize="16px" color="primary.40">
                      {comment.replies.length} Respostas
                    </Text>
                    <Icon color="primary.40" fontSize="16px">
                      <IoIosArrowDown />
                    </Icon>
                  </Flex>
                )}
              </Box>
            </Flex>
          ))
        )}
      </VStack>
    </VStack>
  );
};

export default CommentsVideo;
