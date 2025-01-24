import { http } from "./http/http";

export async function getTickets() {
  const { data } = await http.get(`/tickets`, {});
  return data;
}

export async function createTicket(
  courseId?: string | null,
  params?: NewTicket
) {
  const { data } = await http.post(`/tickets/${courseId}`, { params });
  return data;
}
