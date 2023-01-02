import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar';
import './index.css';
import Coffees from './pages/coffees';
import Foods from './pages/foods';
import HomePage from './pages/homePage';
import NoPage from './pages/noPage';
import Signup from './pages/signup/signup';
import Snacks from './pages/snacks';
import User from './pages/user/user';
import "@blueprintjs/icons/lib/css/blueprint-icons.css"
import "@blueprintjs/core/lib/css/blueprint.css"
import "normalize.css/normalize.css"
import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <NavBar />
        <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="user/:id" element={<User />} />
            <Route exact path='signup' element={<Signup />} />
            <Route exact path='foods' element={<Foods />} />
            <Route exact path='coffees' element={<Coffees />} />
            <Route exact path='snacks' element={<Snacks />} />
            <Route exact path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
);