import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITag } from "./tags.interfaces";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BFF_URL}/`,
  }),
  endpoints: (builder) => ({
    getTagByVisitorId: builder.query<ITag[], { id: string }>({
      query: ({ id }) => `tags/ById/${id}`,
    }),
  }),
});

export const { useGetTagByVisitorIdQuery } = tagsApi;
