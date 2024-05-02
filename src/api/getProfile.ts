import { api } from "@/lib/axios";

export type GetProfileBody = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: "manager" | "customer";
  createdAt: Date | null;
  updatedAt: Date | null;
};

export const getProfile = async () => {
  const res = await api.get<GetProfileBody>("/me");
  return res.data;
};
