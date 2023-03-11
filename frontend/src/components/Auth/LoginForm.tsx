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

        try {
            const res = await login(formState).unwrap();
            const logUser = { user: res.user, token: res.token }
            dispatch(setUser(logUser));
            setErrorList([])
        } catch (error: any | unknown) {
            const data = await error?.data.errors
            setErrorList(data)
        }
    }

    return (
        <div className="container-md">
            <Form className="d-flex flex-column" noValidate validated={isError} onSubmit={loginSubmitFunction}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address or Username</Form.Label>
                    <Form.Control className="border border-primary-subtle" required name="credential" value={formState.credential} onChange={changeHandler} type="email" placeholder="Enter email or username" />
                    <Form.Control.Feedback type="invalid"> {errorList[0] === "Please provide a valid email or username." ? errorList[0] : null} </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="border border-primary-subtle" required name="password" type="password" value={formState.password} onChange={changeHandler} placeholder="Enter password" />
                    <Form.Control.Feedback type="invalid"> {errorList[0] === "Please provide a valid password." || errorList[1] === "Please provide a valid password." ? "Please provide a valid password." : null} </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );

}

