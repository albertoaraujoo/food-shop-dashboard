import { api } from "@/lib/axios";

export type getMonthRevenueResponse = {
  receipt: number;
  diffFromLastMonth: number;
};

export const getMonthRevenue = async () => {
  const res = await api.get<getMonthRevenueResponse>("/metrics/month-receipt");

  return res.data;
};
