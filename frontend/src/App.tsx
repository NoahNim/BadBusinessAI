import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import { LoginForm } from './components/Auth/LoginForm';
import { Home } from './components/Home/Home';
import { Navigation9000 } from './components/Nav/Navigator9000';

function App() {
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
