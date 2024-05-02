import { api } from "@/lib/axios";

export type RegisterRestaurantBody = {
  restaurantName: string;
  managerName: string;
  email: string;
  phone: string;
};

export const registerRestaurant = async ({
  email,
  managerName,
  restaurantName,
  phone,
}: RegisterRestaurantBody) => {
  await api.post("/restaurants", {
    email,
    managerName,
    restaurantName,
    phone,
  });
};
