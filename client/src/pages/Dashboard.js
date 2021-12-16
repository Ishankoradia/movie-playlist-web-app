import { react, useState, useLayoutEffect, useContext } from 'react';
import jwt from 'jsonwebtoken';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Movies from '../components/Movies';
import SideBarPlaylists from '../components/SideBarPlaylists';
import UserContext from '../context/userContext';
import styled from 'styled-components';

const config = require('../config/config');

const Dashboard = () => {
    const { userData, setUserData } = useContext(UserContext);
    const [render, setRender] = useState(false); //render component only if the token is found and valid    

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
            console.log(user);
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

    return (
        <h1>
            {render && 
                <div>
                    <Header />
                    <ContentContainer>
                        <SideBarPlaylists />
                        <Divider></Divider>
                        <Movies />
                    </ContentContainer>                   
                </div>                
            }
        </h1>
    )
}

export default Dashboard

const ContentContainer = styled.div`
    display:flex;
    height: 100%;
    height: 100vh;
`;

const Divider = styled.div`
    float:left;
    height:100px;
    width:1px; /* edit this if you want */
    background-color: black
    height: 100vh;
`;