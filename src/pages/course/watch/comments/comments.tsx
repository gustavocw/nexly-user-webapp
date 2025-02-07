import { Box, Flex, Icon, Input, Spinner, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "components/ui/avatar";
import { PiChats } from "react-icons/pi";
import { BiLike } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdSend } from "react-icons/io";
import { useCommentsController } from "./controller";
import useAuthStore from "stores/auth.store";

interface CommentsProps {
  lessonId?: string;
  lesson?: Lesson[];
  refetchLesson: () => void;
}

const CommentsVideo: React.FC<CommentsProps> = ({
  lessonId,
  lesson,
  refetchLesson,
}) => {
  const {
    comment,
    setComment,
    handleSendComment,
    handleReply,
    handleViewRepplies,
    repplies,
    viewingRepliesFor,
    loadingReplies,
  } = useCommentsController(lessonId, refetchLesson);
  const { area } = useAuthStore();
  const hasComments = lesson?.some(
    (unique) =>
      unique.comments && unique.comments.some((comment) => comment._id !== null)
  );
  console.log(lesson);
  
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
        {hasComments ? (
          lesson?.map((unique) =>
            unique.comments?.map((comment: any) => (
              <Flex key={comment._id} w="100%" gap="10px">
                <Avatar src={comment.userPhoto} w="32px" h="32px" />
                <Box w="100%">
                  <Flex>
                    <Text color="neutral.10">{comment.name} • Há 12 horas</Text>
                  </Flex>
                  <Text fontSize="16px" color="neutral">
                    {comment.comment}
                  </Text>
                  <Flex
                    onClick={() => handleReply(comment._id, comment.name)}
                    my={2}
                    alignItems="center"
                    gap="16px"
                  >
                    <Icon cursor="pointer" fontSize="20px" color="neutral">
                      <BiLike />
                    </Icon>
                    <Text cursor="pointer" fontSize="16px" color="neutral">
                      Responder
                    </Text>
                  </Flex>
                  {comment.responses_count > 0 && (
                    <Flex
                      cursor="pointer"
                      gap="10px"
                      alignItems="center"
                      onClick={() => handleViewRepplies(comment?._id)}
                    >
                      <Text fontSize="16px" color={area?.color}>
                        {comment.responses_count} Respostas
                      </Text>
                      <Icon color={area?.color} fontSize="16px">
                        <IoIosArrowDown />
                      </Icon>
                      {loadingReplies && viewingRepliesFor === comment._id && (
                        <Spinner size="sm" color={area?.color} />
                      )}
                    </Flex>
                  )}
                  {viewingRepliesFor === comment._id &&
                    Array.isArray(repplies) && (
                      <Box
                        mt="10px"
                        bg="neutral.60"
                        p="10px"
                        borderRadius="md"
                        overflowY="auto"
                        maxH="200px"
                      >
                        {repplies.map((reply) => (
                          <Flex key={reply._id} w="100%" gap="10px" mb="10px">
                            <Avatar src={reply.userPhoto} w="32px" h="32px" />
                            <Box w="100%">
                              <Flex>
                                <Text color="neutral.10">
                                  {reply.username} • Há 12 horas
                                </Text>
                              </Flex>
                              <Text fontSize="16px" color="neutral">
                                {reply.content}
                              </Text>
                            </Box>
                          </Flex>
                        ))}
                      </Box>
                    )}
                </Box>
              </Flex>
            ))
          )
        ) : (
          <Text fontSize="16px" color="neutral">
            Esse vídeo não possui comentários, seja o primeiro a comentar.
          </Text>
        )}
      </VStack>
    </VStack>
  );
};

export default CommentsVideo;
