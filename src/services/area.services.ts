import { http } from "./http/http";

export async function getArea(domain: string) {
  const { data } = await http.get<[Area | null]>(`/member/member-area?domain=${domain}`, {});
  return data[0];
}

export async function getAreaLogin(domain: string) {
  const { data } = await http.get(`/member/member-area-login?domain=${domain}`, {});
  return data;
}

