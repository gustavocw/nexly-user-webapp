import { useMutation } from "@tanstack/react-query";
import { favoriteVideo, likeVideo } from "services/course.services";

interface UseControllerVideoProps {
  refetchLesson: () => void;
}

export function useControllerVideo({ refetchLesson }: UseControllerVideoProps) {
  const { mutate: mutateFavorite } = useMutation({
    mutationFn: (lessonId?: string) => favoriteVideo(lessonId),
    onSuccess: () => {
      refetchLesson();
    },
  });

  const { mutate: mutateLike } = useMutation({
    mutationFn: (params: any) => likeVideo(params?.lessonId, params?.type),
    onSuccess: () => {
      refetchLesson();
    },
  });

  return { mutateFavorite, mutateLike };
}
