import {createApi} from "@reduxjs/toolkit/query/react"
import customFetchBase from "./customFetchBase"
import { IProgram } from "./types"

export const programApi = createApi({
    reducerPath: 'programApi',
    baseQuery: customFetchBase,
    tagTypes: [],
    endpoints: (builder) => ({
        getAllPrograms: builder.query<IProgram[], void>({
            query(){
                return {
                    url: "/programs",
                }
            }
        })
    })


})

export const {
    useGetAllProgramsQuery
} = programApi