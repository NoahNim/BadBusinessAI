import { useLoginMutation } from "../../redux/app/services/api";
import { useState } from "react";
import { setUser } from "../../redux/features/auth/userSlice";
import { useAppDispatch } from "../../redux/app/hooks";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginForm = () => {
    const [formState, setFormState] = useState({
        credential: "",
        password: "",
    })
    const dispatch = useAppDispatch();
    const [login, { isError }] = useLoginMutation();
    const [errorList, setErrorList] = useState([]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const loginSubmitFunction = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(e)

        try {
            const res = await login(formState).unwrap();
            const logUser = { user: res.user, token: res.token }
            dispatch(setUser(logUser));
            setErrorList([])
        } catch (error: any | unknown) {
            const data = await error?.data.errors
            console.log(data)
            setErrorList(data)
        }
    }

    return (
        <Form noValidate onSubmit={loginSubmitFunction}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address or Username</Form.Label>
                <Form.Control required name="credential" value={formState.credential} onChange={changeHandler} type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control required name="password" type="password" value={formState.password} onChange={changeHandler} placeholder="password" />
            </Form.Group>
            <Button type="submit">
                Login
            </Button>
        </Form>
    );

}

