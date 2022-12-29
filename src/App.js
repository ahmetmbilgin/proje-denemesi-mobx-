import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Coffees from './pages/coffees';
import Foods from './pages/foods';
import HomePage from './pages/homePage';
import Login from './pages/login/login';
import NoPage from './pages/noPage';
import Signup from './pages/signup/signup';
import Snacks from './pages/snacks';
import User from './pages/user';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="user/:id" element={<User />} />
          <Route path='login' element={<Login />} />
          <Route path='signin' element={<Signup />} />
          <Route path='foods' element={<Foods />} />
          <Route path='coffees' element={<Coffees />} />
          <Route path='snacks' element={<Snacks />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;