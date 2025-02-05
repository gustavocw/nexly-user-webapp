import { useMutation } from '@tanstack/react-query';
import { favoriteVideo } from 'services/course.services';

export function useControllerVideo() {

  const { mutate: mutateFavorite } = useMutation({
    mutationFn: (lessonId?: string) => favoriteVideo(lessonId),
  })

  return { mutateFavorite };
}
