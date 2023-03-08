import React from "react";
import { renderHook } from "@testing-library/react";
import { api, useLoginMutation } from "../../redux/app/services/api";
import userReducer from "../../redux/features/auth/userSlice";
import { setupApiStore } from "../testUtils";
import { Provider } from "react-redux";
import { ReactNode } from "react";

interface wrapperInterface {
    children?: ReactNode | any
}

const wrapper: React.FC = ({ children }: wrapperInterface) => {
    const storeRef = setupApiStore(api, { auth: userReducer });
    return <Provider store={storeRef.store} > {children} </Provider>

};

describe('Auth API Requests', () => {


    it("Internal Server Error", async () => {
        const { result } = renderHook(
            () => useLoginMutation(undefined),
            {
                wrapper,
            }
        );
        const [initialResponse] = result.current

        expect(initialResponse).rejects

    })


})
