import { http, HttpResponse } from "msw";

import { GetProfileBody } from "../getProfile";

export const getProfileMock = http.get<never, never, GetProfileBody>(
  "/me",
  () => {
    return HttpResponse.json({
      id: "custom-user-id",
      name: "john doe",
      email: "johndoe@email.com",
      phone: "934893944",
      role: "manager",
      createdAt: new Date(),
      updatedAt: null,
    });
  },
);
