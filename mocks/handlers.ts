import { IVisitorResponse } from "@/src/services/visitors/visitors.interfaces";
import { http, HttpResponse } from "msw";
import { groupHandlers, groupsMock } from "./groups.handlers";

const DOMAIN = process.env.NEXT_PUBLIC_BFF_URL;

export const handlers: any = [
  http.get(`${DOMAIN}/users/all`, () => {
    return HttpResponse.json([
      {
        id: "12345",
        key: "user123",
        fullName: "John Doe",
        mail: "johndoe@example.com",
        roles: [
          {
            id: "role1",
            name: "Admin",
          },
          {
            id: "role2",
            name: "Editor",
          },
        ],
      },
    ]);
  }),

  http.get(`${DOMAIN}/visitors/:id`, ({ params }) => {
    const visitors: { [key: string]: IVisitorResponse } = {};
    groupsMock.forEach((group) => {
      group.Grupo.PerfilVisitantes.map((visitor) => {
        visitors[visitor.Email] = visitor;
      });
    });

    const visitor = visitors[params.id as string];

    if (visitor) {
      return HttpResponse.json(visitor);
    }

    return new HttpResponse(null, { status: 404 });
  }),

  http.post(`${DOMAIN}/tags`, () => {
    return new HttpResponse(null, { status: 201 });
  }),

  ...groupHandlers,
];
