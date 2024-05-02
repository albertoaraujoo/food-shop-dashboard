import { api } from "@/lib/axios";

export type GetDayOrdersAmountResponse = {
  amount: number;
  diffFromYesterday: number;
};

export const getDayOrdersAmount = async () => {
  const res = await api.get<GetDayOrdersAmountResponse>(
    "/metrics/day-orders-amount",
  );

  return res.data;
};
