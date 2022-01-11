import { react, useState, useLayoutEffect, useContext } from 'react';
import jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Movies from '../components/Movies';
import SideBarPlaylists from '../components/SideBarPlaylists';
import PlaylistMovies from '../components/PlaylistMovies';
import UserContext from '../context/userContext';
import styled from 'styled-components';
import CurrentPlaylistContext from '../context/currentPlaylistContext';

const config = require('../config/config');

const Dashboard = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [render, setRender] = useState(false); //render component only if the token is found and valid   

    const [floatingbutton, setFloatingButton] = useState(false);
    
    //active selected playlist
    const {selectedPlaylistId, setSelectedPlaylistId} = useContext(CurrentPlaylistContext);

    async function authenticateToken(){
        const token = localStorage.getItem('token');
        const req = await fetch(`${config.SERVER_URI}/api/authenticate`, {
            headers: {
                'x-access-token': token,
            }
        });

        const data = await req.json();
        if(data.success){
            setRender(true);
            setUserData({
                token, 
                user: data.user
            })
        }else{ //invalid token
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
    }

    useLayoutEffect(() => {
        //check local token
        const token = localStorage.getItem('token');
        if(token){
            const user = jwt.decode(token);
            if(!user){
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else{
                authenticateToken();
            }
        } else{
            setRender(false);
            window.location.href = "/login";
        }
    }, []);

    const toggleFloatingPlaylistDisplay = () => {
        setFloatingButton(!floatingbutton);
    }

    return (
        <div>
            {render && 
                <div>
                    <Header highlight={"dashboard"} />
                    <ContentContainer>
                        <FloatingButtonContainer>
                            <FloatingButton 
                                onClick={toggleFloatingPlaylistDisplay}>
                                Playlists
                            </FloatingButton>
                        </FloatingButtonContainer>
                        <SideBarPlaylists displayMobilePlaylist={floatingbutton} />
                        <Divider></Divider>
                        {selectedPlaylistId === false ? <Movies /> : <PlaylistMovies />}
                    </ContentContainer>                   
                </div>                
            }
        </div>
    )
}

export default Dashboard

const ContentContainer = styled.div`
    display:flex;
    height: 100%;
    height: 100vh;
`;

const FloatingButtonContainer = styled.div`
    position: absolute;
    transform: rotate(-90deg);
    top: 150px;
    left: -20px;
    display: none;
    @media only screen and (max-width: 768px){
        display: block;
        z-index: 12;
    }
`;

const FloatingButton = styled.button`
    border-radius: 10px;
    border: 1px solid black;
`;

const Divider = styled.div`
    float:left;
    height:100px;
    width:1px; /* edit this if you want */
    background-color: black
    height: 100vh;
`;