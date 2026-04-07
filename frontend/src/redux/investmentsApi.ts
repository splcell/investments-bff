/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SearchResult } from "../types/search";
import type { User } from "../types/user";
import type { Company } from "../types/company";
import type { Quote } from "../types/quote";
import type { FullReport } from "../types/report";
import type { Dividend } from "../types/dividends";
import type { News } from "../types/news";
import type { CollectResponse } from "../types/collect";

const baseAppUrl = "http://localhost:3000";

export const investmentsApi = createApi({
  reducerPath: "investmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAppUrl,
  }),

  tagTypes: ["Collection", "User"],

  endpoints: (build) => ({
    getNews: build.query<any, void>({
      query: () => "/news",
    }),

    getSearchNameResults: build.query<SearchResult, { name: string }>({
      query: ({ name }) => `/search/name?name=${encodeURIComponent(name)}`,
    }),

    getCurrentUser: build.query<any, void>({
      query: () => ({
        url: "/cabinet/user",
        credentials: "include",
      }),
      providesTags: ['User']
    }),

    getCompanyInfo: build.query<Company, {ticker: string}>({
      query: ({ticker}) => ({
        url: `/company/${ticker}`,
        credentials: "include",
      })
    }),

    getCompanyQuote: build.query<Quote, {ticker: string}>({
      query: ({ticker}) => ({
        url: `/company/${ticker}/quote`,
        credentials: "include",
      })
    }),

    getCompanyReports: build.query<FullReport, {ticker: string, period: string}>({
      query: ({ticker, period}) => `/company/${ticker}/reports?period=${period}`
    }),

    getCompanyDividends: build.query<Dividend[], {ticker: string}>({
      query: ({ticker}) => `/company/${ticker}/dividends/`
    }),

    getCompanyNews: build.query<News[], {ticker: string}>({
      query: ({ticker}) => `/company/${ticker}/news`
    }),

    getUserCollection: build.query<CollectResponse, {id: string}>({
      query: ({id}) => ({
        url: `/getCollection/${id}`,
        credentials: "include"
      }),
      providesTags: (result, error, arg) => [{ type: "Collection", id: arg.id }]
    }),

    getFullUserCollection: build.query({
      query: ({id}) => ({
        url: `/fullCollection/${id}`,
        credentials: "include"
      }),
      providesTags: (result, error, arg) => [{ type: "User", id: arg.id }]
    }),

    addToCollection: build.mutation({
      query: (body) => ({
        url: "/collection/add",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Collection"]
    }),

    deleteToCollection: build.mutation({
      query: (body) => ({
        method: "DELETE",
        url: "/collection/delete",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["Collection", "User"]
    }),

    userRegister: build.mutation({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        credentials: "include",
        body,
      }),

      invalidatesTags: ["User"],

      transformErrorResponse: (response, meta) => {
        console.log(response, 'res')
        console.log(meta, "meta")
      },
    }),

    userLogin: build.mutation<User, {email: string, password: string}>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        credentials: "include",
        body,
      }),
      invalidatesTags: ["User"]
    }),

    userLogout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"]
    }),

    userUpdate: build.mutation({
      query: (body) => ({
        url: "/cabinet/settings",
        method: "PATCH",
        credentials: "include",
        body
      }),
      invalidatesTags: ["User"]
    }),

    userDelete: build.mutation({
      query: (body) => ({
        url: "/cabinet/settings/delete",
        method: "DELETE",
        credentials: "include",
        body
      }),
      invalidatesTags: ["User"]
    })
  }),
});

export const {
  useGetNewsQuery,
  useGetSearchNameResultsQuery,
  useGetCurrentUserQuery,
  useGetCompanyReportsQuery,
  useGetCompanyNewsQuery,
  useGetUserCollectionQuery,
  useGetFullUserCollectionQuery,
  useLazyGetCompanyDividendsQuery,
  useLazyGetCompanyInfoQuery,
  useLazyGetCompanyQuoteQuery,
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserUpdateMutation,
  useUserDeleteMutation,
  useAddToCollectionMutation,
  useDeleteToCollectionMutation
} = investmentsApi;
