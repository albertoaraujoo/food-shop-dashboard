import { api } from "@/lib/axios";

export type DispatchOrderParams = {
  orderId: string;
};

export const dispatchOrder = async ({ orderId }: DispatchOrderParams) => {
  await api.patch(`/orders/${orderId}/dispatch`);
};
