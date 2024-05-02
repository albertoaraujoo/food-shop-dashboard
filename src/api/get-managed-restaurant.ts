import { api } from "@/lib/axios";

export type GetManagedRestaurantBody = {
  id: string;
  name: string;
  createdAt: Date | null;
  updatedAt: Date | null;
  description: string | null;
  managerId: string | null;
};

export const getManagedRestaurant = async () => {
  const res = await api.get<GetManagedRestaurantBody>("/managed-restaurant");
  return res.data;
};
