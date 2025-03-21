import { http } from "./http/http";

export async function getTickets(areaId?: string, search?: string) {
  const { data } = await http.get<{data: Ticket[]}>(`/tickets/${areaId}`, {
    params: { search },
  });
  return data.data;
}

export async function createTicket(
  areaId?: string | null,
  params?: NewTicket
) {
  const { data } = await http.post(`/tickets/${areaId}`, params);
  return data;
}

export async function getTicketMessages(roomId?: string) {
  const { data } = await http.get<any>(`/tickets/message/${roomId}`);
  return data;
}