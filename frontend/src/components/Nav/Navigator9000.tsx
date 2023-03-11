import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAppSelector } from '../../redux/app/hooks';
import { LogoutButton } from '../Auth/LogoutButton';

export const Navigation9000 = () => {
    const sessionUser = useAppSelector((state) => state?.auth?.user)

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Bad Business AI</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">

                    {sessionUser ? <Nav className="me-auto">
                        <Nav.Link href="stored-ideas">Stored Ideas</Nav.Link>
                        <Nav.Item><LogoutButton /></Nav.Item>
                    </Nav>
                        :
                        <Nav className="me-auto">
                            <Nav.Link href="login">Login</Nav.Link>
                            <Nav.Link href="sign-up">Register</Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}