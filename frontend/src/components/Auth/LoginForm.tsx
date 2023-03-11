import { useLoginMutation } from "../../redux/app/services/api";
import { useState } from "react";
import { setUser } from "../../redux/features/auth/userSlice";
import { useAppDispatch } from "../../redux/app/hooks";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
    const [formState, setFormState] = useState({
        credential: "",
        password: "",
    })
    const dispatch = useAppDispatch();
    const [login, { isError }] = useLoginMutation();
    const [credentialError, setCredentialError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const navigate = useNavigate();

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
            setCredentialError(null);
            setPasswordError(null);
            navigate("/")
        } catch (error: any | unknown) {
            const data = await error?.data.errors
            if (data) {
                data?.forEach((error: any) => {
                    switch (error) {
                        case "The provided credentials were invalid.":
                            setCredentialError(error);
                            setPasswordError(error);
                            break;
                        case "Please provide a valid email or username.":
                            setCredentialError(error);
                            break;
                        case "Please provide a valid password.":
                            setPasswordError(error)
                            break;
                        default:
                            break;
                    }
                })
            }
        }
    }

    return (
        <div className="container-md">
            <Form className="d-flex flex-column" noValidate validated={isError === true ? false : true} onSubmit={loginSubmitFunction}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address or Username</Form.Label>
                    <Form.Control isInvalid={credentialError !== null ? true : false} className="border border-primary-subtle" required name="credential" value={formState.credential} onChange={changeHandler} type="email" placeholder="Enter email or username" />
                    <Form.Control.Feedback type="invalid"> {credentialError} </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control isInvalid={passwordError !== null ? true : false} className="border border-primary-subtle" required name="password" type="password" value={formState.password} onChange={changeHandler} placeholder="Enter password" />
                    <Form.Control.Feedback type="invalid"> {passwordError} </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );

}

