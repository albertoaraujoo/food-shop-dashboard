import { api } from "@/lib/axios";

export type GetMonthCanceledOrdersAmountResponse = {
  amount: number;
  diffFromLastMonth: number;
};

export const getMonthCanceledOrdersAmount = async () => {
  const res = await api.get<GetMonthCanceledOrdersAmountResponse>(
    "/metrics/month-canceled-orders-amount",
  );

  return res.data;
};
