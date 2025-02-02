import { http } from "./http/http";

export async function uploadPhoto(file: File) {
  const { data } = await http.post<any>("/student/login", file);
  return data;
}

export async function updateProfile(params: User) {
  const { data } = await http.post<any>("/student/profile", params);
  return data;
}

export async function updateAddress(params: Address, addreddId?: string) {
  const { data } = await http.post<any>(`/student/address/${addreddId}`, params);
  return data;
}

export async function getMe() {
  const { data } = await http.get<User>("/student/profile", {});
  return data;
}

export async function getAddress() {
  const { data } = await http.get<any>("/student/profile", {});
  console.log(data);

  return data;
}
