/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { SearchResult } from "../types/search";
import type { User } from "../types/user";
import type { Company } from "../types/company";
import type { Quote } from "../types/quote";
import type { FullReport } from "../types/report";
import type { DividendsResponse } from "../types/dividends";

const baseAppUrl = "http://localhost:3000";

export const investmentsApi = createApi({
  reducerPath: "investmentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAppUrl,
  }),

  endpoints: (build) => ({
    getNews: build.query<any, void>({
      query: () => "/news",
    }),

    getSearchNameResults: build.query<SearchResult, { name: string }>({
      query: ({ name }) => `/search/name?name=${encodeURIComponent(name)}`,
    }),

    getCurrentUser: build.query<any, void>({
      query: () => ({
        url: "/cabinet",
        credentials: "include",
      })
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

    getCompanyDividends: build.query<DividendsResponse, {ticker: string}>({
      query: ({ticker}) => `/company/${ticker}/dividends`
    }),

    userRegister: build.mutation({
      query: (body) => ({
        url: "/auth",
        method: "POST",
        credentials: "include",
        body,
      }),

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
    }),

    userLogout: build.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        credentials: "include",
      }),
    }),

    userUpdate: build.mutation({
      query: (body) => ({
        url: "/cabinet/settings",
        method: "PATCH",
        credentials: "include",
        body
      }),
    }),

    userDelete: build.mutation({
      query: (body) => ({
        url: "/cabinet/settings/delete",
        method: "DELETE",
        credentials: "include",
        body
      })
    })
  }),
});

export const {
  useGetNewsQuery,
  useGetSearchNameResultsQuery,
  useGetCurrentUserQuery,
  useGetCompanyReportsQuery,
  useGetCompanyDividendsQuery,
  useLazyGetCompanyInfoQuery,
  useLazyGetCompanyQuoteQuery,
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserUpdateMutation,
  useUserDeleteMutation
} = investmentsApi;
