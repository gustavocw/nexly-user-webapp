import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { commentLesson, getRepplies, repplyComment } from "services/course.services";
import { toaster } from "components/ui/toaster";

export const useCommentsController = (lessonId: string | undefined, refetchLesson: () => void) => {
  const [comment, setComment] = useState("");
  const [replyToCommentId, setReplyToCommentId] = useState<string | null>(null);
  const [viewingRepliesFor, setViewingRepliesFor] = useState<string | null>(null);

  const { data: repplies = [], refetch: refetchReplies, isLoading: loadingReplies } = useQuery({
    queryKey: ["repplies", replyToCommentId],
    queryFn: () => getRepplies(replyToCommentId).then(data => data.response),
    enabled: false,
  });
  
  const handleViewRepplies = (commentId: string) => {
    if (viewingRepliesFor === commentId) {
      setViewingRepliesFor(null);
      setReplyToCommentId(null);
    } else {
      setReplyToCommentId(commentId);
      setViewingRepliesFor(commentId);
      refetchReplies();
    }
  }

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

  const { mutate: mutateRepply } = useMutation({
    mutationFn: (params: { _id: string, content: string }) => repplyComment(params._id, params?.content),
    onSuccess: () => {
      refetchLesson();
      toaster.create({
        title: "Comentário respondido com sucesso.",
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
      if (replyToCommentId) {
        mutateRepply({ _id: replyToCommentId, content: comment });
        setReplyToCommentId(null);
      } else {
        sendComment(comment);
      }
    }
  };

  const handleReply = (commentId: string, username: string) => {
    setComment(`@${username} `);
    setReplyToCommentId(commentId);
  };

  return {
    comment,
    setComment,
    handleSendComment,
    handleReply,
    handleViewRepplies,
    repplies,
    loadingReplies,
    viewingRepliesFor
  };
};
