import { api } from "@/lib/axios";

export type GetOrderDetailsParams = {
  orderId: string;
};

export type GetOrderDetailsResponse = {
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  id: string;
  createdAt: string;
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
};

export const getOrderDetails = async ({ orderId }: GetOrderDetailsParams) => {
  const res = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`);
  return res.data;
};
