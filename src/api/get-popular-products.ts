import { api } from "@/lib/axios";

export type GetPopularProductsResponse = {
  product: string;
  amount: number;
}[];

export const getPopularProducts = async () => {
  const res = await api.get<GetPopularProductsResponse>(
    "/metrics/popular-products",
  );

  return res.data;
};
