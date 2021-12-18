import { React, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import MyList from './pages/MyList';
import UserContext from './context/userContext';
import PlaylistContext from './context/playlistContext';
import CurrentMovieContext from './context/currentMovieContext';
import CurrentPlaylistContext from './context/currentPlaylistContext';
import ListView from './pages/ListView';

const App = () => {

    const [userData, setUserData] = useState({
        token: undefined,
        user: undefined,
    });

    const [currentPlaylists, setCurrentPlaylists] = useState([]);

    const [currentMovie, setCurrentMovie] = useState({});

    const [selectedPlaylistId, setSelectedPlaylistId] = useState(false);

    return (
        <div>
            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <PlaylistContext.Provider value={{currentPlaylists, setCurrentPlaylists}}>
                        <CurrentMovieContext.Provider value={{currentMovie, setCurrentMovie}}>
                            <CurrentPlaylistContext.Provider value={{selectedPlaylistId, setSelectedPlaylistId}}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/playlistview/:id" element={<ListView />} />
                                </Routes>
                            </CurrentPlaylistContext.Provider>
                        </CurrentMovieContext.Provider>
                    </PlaylistContext.Provider>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
}

export default App
