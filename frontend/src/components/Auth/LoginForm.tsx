import { useLoginMutation } from "../../redux/app/services/api";
import { useState } from "react";
import { setUser } from "../../redux/features/auth/userSlice";
import { useAppDispatch } from "../../redux/app/hooks";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginForm = () => {
    const [formState, setFormState] = useState({
        credential: "",
        email: "",
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

    // const loginSubmitFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     const user = { credential, password }

    //     try {
    //         const res = await login(user).unwrap();
    //         const logUser = { user: res.user, token: res.token }
    //         dispatch(setUser(logUser));
    //         setErrorList([])
    //     } catch (error: any | unknown) {
    //         const data = await error?.data.errors
    //         console.log(data)
    //         setErrorList(data)
    //     }
    // }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );

}

