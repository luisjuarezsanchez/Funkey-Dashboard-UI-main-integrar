import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICamera {
  id: string;
  name: string;
  description: string;
  preview: string;
  isConnected: boolean;
}

export const camerasApi = createApi({
  reducerPath: "camerasApi",

  refetchOnFocus: false,
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BFF_URL}/`,
  }),
  endpoints: (builder) => ({
    getCameras: builder.query<ICamera[], null>({
      query: () => "cameras",
    }),
  }),
});

export const { useGetCamerasQuery } = camerasApi;
