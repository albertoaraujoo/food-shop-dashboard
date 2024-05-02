import { api } from "@/lib/axios";

export type ApproveOrderParams = {
  orderId: string;
};

export const approveOrder = async ({ orderId }: ApproveOrderParams) => {
  await api.patch(`/orders/${orderId}/approve`);
};
