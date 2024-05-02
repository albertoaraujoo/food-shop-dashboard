import { api } from "@/lib/axios";

export type GetDailyRevenueInPeriodQuery = {
  from?: Date;
  to?: Date;
};

export type getDailyRevenueInPeriodResponse = {
  date: string;
  receipt: number;
}[];

export const getDailyRevenueInPeriod = async ({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) => {
  const res = await api.get<getDailyRevenueInPeriodResponse>(
    "/metrics/daily-receipt-in-period",
    { params: { from, to } },
  );
  return res.data;
};
