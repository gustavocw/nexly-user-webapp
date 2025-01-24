import { http } from "./http/http";

export async function getArea(domain: string) {
  const { data } = await http.get(`/member/member-area?domain=${domain}`, {});
  return data;
}
