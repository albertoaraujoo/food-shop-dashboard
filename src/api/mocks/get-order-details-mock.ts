import { http, HttpResponse } from "msw";

import {
  GetOrderDetailsParams,
  GetOrderDetailsResponse,
} from "../get-order-details";

export const getOrderDetailsMock = http.get<
  GetOrderDetailsParams,
  never,
  GetOrderDetailsResponse
>("/orders/:orderId", ({ params }) => {
  return HttpResponse.json({
    id: params.orderId,
    customer: {
      name: "John Doe",
      email: "johndoe@email.com",
      phone: "93489093944",
    },
    status: "pending",
    createdAt: new Date().toISOString(),
    totalInCents: 5000,
    orderItems: [
      {
        id: "order-item-1",
        priceInCents: 1000,
        product: {
          name: "Pizza",
        },
        quantity: 1,
      },
      {
        id: "order-item-2",
        priceInCents: 2000,
        product: {
          name: "Other Pizza",
        },
        quantity: 2,
      },
    ],
  });
});
