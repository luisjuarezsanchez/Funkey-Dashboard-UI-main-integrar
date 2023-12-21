import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IInteraction {
  idRfid: string;
  idSensor: string;
  visitor: string;
  activationDate: string;
}

export const interactionsApi = createApi({
  reducerPath: "interactionsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BFF_URL}/`,
  }),
  endpoints: (builder) => ({
    getInteractionByVisitorId: builder.query<IInteraction[], { id: string }>({
      query: ({ id }) => `interactions/${id}`,
    }),
  }),
});

export const { useGetInteractionByVisitorIdQuery } = interactionsApi;
