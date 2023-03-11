import { useSignupMutation } from "../../redux/app/services/api";
import { useState } from "react";
import { setUser } from "../../redux/features/auth/userSlice";
import { useAppDispatch } from "../../redux/app/hooks";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const SignUpForm = () => {
    const dispatch = useAppDispatch();
    const [signup, { isLoading, isError }] = useSignupMutation();
    const [formState, setFormState] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [errorList, setErrorList] = useState([]);

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const signupSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await signup(formState).unwrap();
            const signupUser = { user: res.user, token: res.token }
            dispatch(setUser(signupUser));
            setErrorList([])
        } catch (error: unknown | any) {
            const data = await error?.data.errors
            console.log(data)
            setErrorList(data)
        }
    }

    return (
        <div className="container-md" >
            <Form className="d-flex flex-column" noValidate validated={isError}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control className="border border-primary-subtle" required name="username" value={formState.username} onChange={changeHandler} type="text" placeholder="Enter a username" />
                    <Form.Control.Feedback type="invalid"> {errorList}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email addresse</Form.Label>
                    <Form.Control className="border border-primary-subtle" required name="email" value={formState.email} onChange={changeHandler} type="email" placeholder="Enter your email" />
                    <Form.Control.Feedback type="invalid"> {errorList[0] === "Please provide a valid email or username." ? errorList[0] : null} </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className="border border-primary-subtle" required name="password" type="password" value={formState.password} onChange={changeHandler} placeholder="Enter a password" />
                    <Form.Control.Feedback type="invalid"> {errorList[0] === "Please provide a valid password." || errorList[1] === "Please provide a valid password." ? "Please provide a valid password." : null} </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">
                    Login
                </Button>
            </Form>
        </div >
    )
}