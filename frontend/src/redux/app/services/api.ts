import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { url } from 'inspector';
import { getCSRFCookie } from '../hooks';

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserResponse {
    user: User;
    token: string | null | undefined;
    userImage: Buffer | null;
}

export interface LoginRequest {
    credential: string;
    password: string;
}

export interface restoreRequest {
    user: User;
}


// this is where the rtk query functions are created and passed from. RTK Query makes an async call to the route in the server
export const api = createApi({
    // the base query is the first query before then doing an endpoint
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: async (headers, endpoints) => {
            const authToken = getCSRFCookie("XSRF-TOKEN")

            if (authToken) {
                headers.set('XSRF-TOKEN', authToken);
            }

            headers.set('Content-type', 'application/json')

            return headers
        }
    }),
    // endpoints are the other queries to the API
    endpoints: (builder) => ({
        // endpoint for csrfrestore
        restore: builder.query({  // builder.query creates an async function which makes a query to the api on the server
            query: () => 'api/csrf/restore/'
        }),
        // login endpoint
        login: builder.mutation<UserResponse, LoginRequest>({ //builder.mutation allows for the query to send updates to the server and apply the changes to the local cache, it also checks that the request and response are the appropriate data Types
            query: (credentials) => ({
                url: '/api/users/login/',
                method: 'POST',
                body: JSON.stringify(credentials)
            }),
        }),
        // register user
        signup: builder.mutation<UserResponse, Partial<User>>({
            query: (userInfo) => ({
                url: "/api/users/sign-up",
                method: "POST",
                body: userInfo
            })
        }),
        // logout user
        logout: builder.query({
            query: () => ({
                url: '/api/users/',
                method: "DELETE",
                'XSRF-TOKEN': getCSRFCookie('XSRF-TOKEN')
            })
        }),
        // restore user
        restoreUser: builder.mutation<UserResponse, restoreRequest>({
            query: () => ('/api/users/')
        }),
        // openAI call
        getBadIdea: builder.mutation({
            query: () => ({
                url: '/api/badideas/chatgpt',
                method: "POST"
            })
        }),
        // retrieve stired bad ideas for a user
        getStoredBadIdeas: builder.query({
            query: () => ({
                url: '/api/badideas/stored-ideas',
                method: 'GET'
            })
        }),
        // stored a bad idea
        storeBadIdeas: builder.mutation({
            query: (storedData) => ({
                url: '/api/badideas/stored-ideas',
                method: 'POST',
                body: JSON.stringify(storedData)
            })
        }),
        // protectedmutation
        protected: builder.mutation<{ message: string }, void>({
            query: () => 'protected',
        }),
    })
})

export const { useLoginMutation, useRestoreQuery, useRestoreUserMutation, useSignupMutation, useLazyLogoutQuery, useGetBadIdeaMutation, useStoreBadIdeasMutation, useGetStoredBadIdeasQuery } = api;