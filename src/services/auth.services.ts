import { http } from "./http/http";

export async function signin(params: Sigin) {
  const { data } = await http.post<any>("/student/login", params);
  return data;
}