import { http } from "./http/http";

export async function getTickets(search?: string) {
  const { data } = await http.get<{data: Ticket[]}>(`/tickets`, {
    params: { search },
  });
  return data.data;
}

export async function createTicket(
  courseId?: string | null,
  params?: NewTicket
) {
  const { data } = await http.post(`/tickets/${courseId}`, params);
  return data;
}
