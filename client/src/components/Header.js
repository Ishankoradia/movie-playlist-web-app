import { React, useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import UserContext from '../context/userContext';

const Header = ({highlight}) => {

    const { userData, setUserData } = useContext(UserContext);

    function logoutUser(event){
        event.preventDefault();

        const token = localStorage.getItem('token');
        if(token){
            localStorage.removeItem('token');
            setUserData({
                undefined,
                undefined
            })
            window.location.href = '/login';
        }
    }

    return (
        <HeaderContainer>
            <Logo>
                <p>ISHAN007 MOVIES</p>
            </Logo>
            <NavBar>
                <NavItem show={highlight === "dashboard" ? true : false} 
                        to="/dashboard">Dashboard</NavItem>
                <NavItem show={highlight === "list" ? true : false} 
                        to="/playlists">My List</NavItem>
                <NavItem show={false} to="/#" onClick={logoutUser}>Log out</NavItem>
                <UserName>Hi {userData.user ? (userData.user.name) : '' }<br/></UserName>                
            </NavBar>
        </HeaderContainer>
    )
}

export default Header

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 120px;
    margin-top: -27px;
`

const Logo = styled.div`
    background-color: #D9352F;
    width: 15%;
    color: white;
    font-family: Courier New;
    height: 100%;
    align-items: center;
    text-align: center;
`

const NavBar = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    background-color: #27242B;
    height: 100%;
    align-items: center;
    gap: 20px;
`

const UserName = styled.p`
    margin-right: 50px;
    color: grey;
`

const NavItem = styled(Link)`
    color: grey;
    cursor: pointer;
    font-size: 15px;
    text-align: center;
    color: ${props => props.show ? 'white' : 'none'};
    &:hover {
        color: white;
    }
`;