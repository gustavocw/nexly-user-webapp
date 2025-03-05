import { http } from "./http/http";

interface LessonResponse {
  data: Lesson[];
}

export async function getCourse(courseid?: string | null) {
  const { data } = await http.get(`/course/${courseid}`, {});
  return data.data;
}

export async function getLessons(moduleId?: string | null) {
  const { data } = await http.get<LessonResponse>(
    `/course/lessons/${moduleId}`,
    {}
  );
  return data.data;
}

export async function getUniqueLesson(lessonId?: string | null) {
  const { data } = await http.get<Lesson[]>(
    `/course/lesson/${lessonId}`,
    {}
  );
  return data;
}


export async function commentLesson(lessonId?: string | null, commentContent?: string) {
  const { data } = await http.post(`/course/lesson-comment/${lessonId}`, {
    commentContent
  });
  return data.data;
}

export async function repplyComment(commentId?: string | null, content?: string) {
  const { data } = await http.post(`/course/response-comment/${commentId}`, {
    content
  });
  return data.data;
}

export async function getRepplies(commentId?: string | null) {
  const { data } = await http.get(`/course/comment/${commentId}`, {});
  return data;
}

export async function favoriteVideo(lessonId?: string | null) {
  const { data } = await http.post(`/course/favorite-lesson/${lessonId}`, {});
  return data.data;
}

export async function getFavorites(memberAreaId?: string | null) {
  const { data } = await http.get<any>(
    `/course/favorite-lesson/${memberAreaId}`,
    {}
  );
  return data.data;
}

export async function likeVideo(lessonId?: string | null, type?: string) {
  const { data } = await http.post(`/course/lesson/like/${lessonId}`, {
    type
  });
  return data.data;
}
