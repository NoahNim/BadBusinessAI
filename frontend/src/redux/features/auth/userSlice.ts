import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { User } from "../../app/services/api";

interface UserState {
    user: User | null
    token: string | null | undefined
}

const userSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null } as UserState,
    reducers: {
        setUser: (
            state,
            { payload: { user, token } }: PayloadAction<{ user: User; token: string | null | undefined }>
        ) => {
            state.user = user
            state.token = token
            localStorage.setItem('user', JSON.stringify(user))
        },
        restoreUser: (
            state,
            { payload: { user, token } }: PayloadAction<{ user: User; token: string | null | undefined }>
        ) => {
            state.user = user
            state.token = token
        },
        removeUser: (
            state
        ) => {
            state.user = null
            state.token = null
        },
    },
})

export const { setUser, restoreUser, removeUser } = userSlice.actions

export default userSlice.reducer