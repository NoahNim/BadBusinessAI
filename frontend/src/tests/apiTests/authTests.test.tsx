/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "http://localhost:3000/"}
 */
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { api, useLoginMutation, useRestoreQuery } from "../../redux/app/services/api";
import userReducer from "../../redux/features/auth/userSlice";
import { setupApiStore } from "../testUtils";
import { Provider } from "react-redux";
import { ReactNode } from "react";

interface wrapperInterface {
    children?: ReactNode | any;
}

const updateTimeout = 5000;

const wrapper: React.FC = ({ children }: wrapperInterface) => {
    const storeRef = setupApiStore(api, { auth: userReducer });
    return (<Provider store={storeRef.store}>
        {children}
    </Provider>)
};


describe('Auth API Requests', () => {
    it("Should successfully call the restore endpoint and get a csrf token", async () => {
        const { result } = renderHook(
            () => useRestoreQuery("/"),
            {
                wrapper
            }
        )
        const initialResponse = await result.current



    })

    it("Login attempt should be made and should return an error", async () => {
        const { result } = renderHook(
            () => (useLoginMutation()),
            {
                wrapper,
            }
        );
        const [login, initialResponse] = result.current

        // const userTest = {
        //     credential: '',
        //     password: ''
        // }

        // await act(async () => {
        //     await login({ credential: '', password: '' })
        // })

        // console.log(result.current[1])
    })


})
