import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { url } from 'inspector';
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

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/',
        prepareHeaders: async (headers, endpoints) => {
            const authToken = getCSRFCookie("XSRF-TOKEN")

            if (authToken) {
                headers.set('XSRF-TOKEN', authToken);
            }

            return headers
        }
    }),
    endpoints: (builder) => ({

    })
})