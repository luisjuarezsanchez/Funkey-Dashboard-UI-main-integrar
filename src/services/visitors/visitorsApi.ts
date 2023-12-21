import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IVisitorResponse, IVisitors } from "./visitors.interfaces";

export const visitorsApi = createApi({
  reducerPath: "visitorsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BFF_URL}/`,
  }),
  endpoints: (builder) => ({
    getVisitorById: builder.query<IVisitors, { id: string }>({
      query: ({ id }) => `visitors/${id}`,
      transformResponse: (response: IVisitorResponse) => ({
        name: `${response.Nombre} ${response.Apellido}`,
        age: "Sin datos",
        reservationType: "Hacienda",
        language: response.Idiomas,
        client: response.CategoriaCA,
        mail: response.Email,
        nationality: response.Nacionalidad,
        responsable: "Sin datos",
        group: "Sin datos",
      }),
    }),
  }),
});

export const { useGetVisitorByIdQuery } = visitorsApi;
