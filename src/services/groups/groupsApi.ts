import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGroup, IGroupResponse } from "./groups.interfaces";

export const groupsApi = createApi({
  reducerPath: "groupsApi",
  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BFF_URL}/`,
  }),
  endpoints: (builder) => ({
    getGroups: builder.query<IGroup[], { startDate: string; endDate: string }>({
      query: ({ startDate, endDate }) =>
        `groups?startDate=${startDate}&endDate=${endDate}`,
      transformResponse: (response: IGroupResponse[]) => {
        return response.map((group: IGroupResponse) => ({
          key: group.CodigoReserva,
          bookingId: group.CodigoReserva,
          namegroup: `Grupo ${group.Grupo.CodigoGrupo}`,
          date: group.FechaLlegada,
          hour: group.HoraLlegada,
          responsable: "Juan Hernandez",
          language: group.Idioma,
          visitorsCount: group.Grupo.NumVisitantes,
          visitors: group.Grupo.PerfilVisitantes.map((visitor) => ({
            key: visitor.IdSalesForce,
            name: `${visitor.Nombre} ${visitor.Apellido}`,
            age: "Sin info",
            language: visitor.Idiomas,
            nacionality: visitor.Nacionalidad,
            client: visitor.CategoriaCA,
            gender: visitor.GeneroPrefijos,
            mail: visitor.Email,
          })),
        }));
      },
    }),
  }),
});

export const { useGetGroupsQuery } = groupsApi;
