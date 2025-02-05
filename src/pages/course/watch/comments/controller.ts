import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { commentLesson } from "services/course.services";
import { toaster } from "components/ui/toaster";

export const useCommentsController = (lessonId: string | undefined, refetchLesson: () => void) => {
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

  return {
    comment,
    setComment,
    handleSendComment,
    handleReply
  };
};
