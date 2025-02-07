import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISeminar } from "../models/ISeminar";

export const seminarAPI = createApi({
    reducerPath:"seminarAPI",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3001"}),
    tagTypes:['seminar'],
    endpoints:(build)=>({
        fetchAllSeminars: build.query<ISeminar[],string>({
            query:(limit)=>({
                url:"/seminars",
                per_page:limit
            }),
            providesTags:() =>['seminar']
        }),
        updateSeminar: build.mutation<ISeminar,ISeminar>({
            query:(seminar)=>({
                url:`/seminars/${seminar.id}`,
                method:"PUT",
                body: seminar
            }),
            invalidatesTags:['seminar']
        }),
        deleteSeminar: build.mutation<ISeminar,ISeminar>({
            query:(seminar)=>({
                url:`/seminars/${seminar.id}`,
                method:"DELETE",
            }),
            invalidatesTags:['seminar']
        })
    })
})