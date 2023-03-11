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
    const [emailError, setEmailError] = useState(null)
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);


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
            setEmailError(null);
            setPasswordError(null);
            setUsernameError(null);
        } catch (error: unknown | any) {
            const data = await error?.data.errors
            if (data) {
                data?.forEach((error: any) => {
                    switch (error) {
                        case 'Please provide a valid email.':
                            setEmailError(error);
                            break;
                        case 'Please provide an unused username with at least 4 characters but less than 30 characters.':
                            setUsernameError(error);
                            break;
                        case 'Username cannot be an email.':
                            setUsernameError(error);
                            break;
                        case 'Password must be 6 characters or more.':
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
        <div className="container-md" >
            <Form className="d-flex flex-column" noValidate validated={isError === true ? false : true} onSubmit={signupSubmitHandler}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control isInvalid={usernameError !== null ? true : false} className="border border-primary-subtle" required name="username" value={formState.username} onChange={changeHandler} type="text" placeholder="Enter a username" />
                    <Form.Control.Feedback type="invalid"> {usernameError}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email addresse</Form.Label>
                    <Form.Control isInvalid={emailError !== null ? true : false} className="border border-primary-subtle" required name="email" value={formState.email} onChange={changeHandler} type="email" placeholder="Enter your email" />
                    <Form.Control.Feedback type="invalid"> {emailError ? emailError : null} </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control isInvalid={passwordError !== null ? true : false} className="border border-primary-subtle" required name="password" type="password" value={formState.password} onChange={changeHandler} placeholder="Enter a password" />
                    <Form.Control.Feedback type="invalid"> {passwordError ? passwordError : null} </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit">
                    Register
                </Button>
            </Form>
        </div >
    )
}