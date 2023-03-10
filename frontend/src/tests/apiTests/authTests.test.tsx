/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "http://localhost:3000/"}
 */
import React from "react";
import { renderHook, act, waitFor } from "@testing-library/react";
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
