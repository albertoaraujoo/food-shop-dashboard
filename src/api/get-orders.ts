import { api } from "@/lib/axios";

export type GetOrdersQuery = {
  pageIndex?: number | null;
  orderId?: string | null;
  customerName?: string | null;
  status?: string | null;
};

export type GetOrdersResponse = {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
};

export const getOrders = async ({
  pageIndex,
  customerName,
  orderId,
  status,
}: GetOrdersQuery) => {
  const res = await api.get<GetOrdersResponse>("/orders", {
    params: {
      pageIndex,
      customerName,
      orderId,
      status,
    },
  });

  return res.data;
};
