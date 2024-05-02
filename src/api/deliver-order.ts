import { api } from "@/lib/axios";

export type DeliverOrderParams = {
  orderId: string;
};

export const deliverOrder = async ({ orderId }: DeliverOrderParams) => {
  await api.patch(`/orders/${orderId}/deliver`);
};
