import { useAppDispatch } from "../../redux/app/hooks";
import { useLazyLogoutQuery } from "../../redux/app/services/api";
import { removeUser } from "../../redux/features/auth/userSlice";
import Button from 'react-bootstrap/Button';

export const LogoutButton = () => {
    const dispatch = useAppDispatch();
    const [trigger, result] = useLazyLogoutQuery()

    const logoutHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const res = await trigger('/api/users/').unwrap()

        if (res.message === 'success') {
            localStorage.removeItem('user');
            dispatch(removeUser());
        }
    }

    return (
        <Button onClick={logoutHandler}>Logout</Button>
    )
}
