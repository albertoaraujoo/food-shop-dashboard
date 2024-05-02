import { http, HttpResponse } from "msw";

import { GetManagedRestaurantBody } from "../get-managed-restaurant";

export const getManagedRestaurantMock = http.get<
  never,
  never,
  GetManagedRestaurantBody
>("/managed-restaurant", () => {
  return HttpResponse.json({
    id: "custom-restaurant-id",
    name: "Pizza Shop",
    createdAt: new Date(),
    updatedAt: null,
    description: "Custom restaurant description",
    managerId: "custom-manager-id",
  });
});
