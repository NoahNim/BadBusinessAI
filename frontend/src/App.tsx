import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { LoginForm } from './components/Auth/LoginForm';
import { Home } from './components/Home/Home';
import { Navigation9000 } from './components/Nav/Navigator9000';
import { useAppDispatch } from './redux/app/hooks';
import { getCSRFCookie } from './redux/app/hooks';
import { store } from './redux/app/store';
import { restoreUser } from './redux/features/auth/userSlice';
import { api } from './redux/app/services/api';

function App() {
  const dispatch = useAppDispatch();
  const authToken = getCSRFCookie('token');
  const storedUser = localStorage.getItem('user');

  useEffect(() => {
    if (authToken !== null && storedUser !== null) {
      const parsedUser = JSON.parse(storedUser);

      const res = store.dispatch(api.endpoints.restoreUser.initiate(parsedUser)).unwrap()
      res.then((res) => {
        const user = { user: res.user, token: res.token }
        dispatch(restoreUser(user))
      })
    }
  })

  return (
    <div>
      <BrowserRouter>
        <Navigation9000 />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
