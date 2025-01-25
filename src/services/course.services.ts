import { http } from "./http/http";

export async function getCourse(courseid?: string | null) {
  const { data } = await http.get(`/course/${courseid}`, {});
  return data.data;
}
