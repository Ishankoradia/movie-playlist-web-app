import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import UserContext from './context/userContext';

const App = () => {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    const [currentPlaylists, setCurrentPlaylists] = useState([]);

    return (
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData, currentPlaylists, setCurrentPlaylists }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
