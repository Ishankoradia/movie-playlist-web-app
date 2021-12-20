import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const config = require('../config/config');

const ListView = () => {

    const [movies, setMovies] = useState([]);

    const [playlist, setPlaylist] = useState();

    const [error, setError] = useState('');

    // const movies = [{
    //     "Title": "Batman: The Killing Joke",
    //     "Year": "2016",
    //     "imdbID": "tt4853102",
    //     "Type": "movie",
    //     "Poster": "https://m.media-amazon.com/images/M/MV5BMTdjZTliODYtNWExMi00NjQ1LWIzN2MtN2Q5NTg5NTk3NzliL2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg"
    //     }];

    async function getPlaylists(){
        console.log(`${config.SERVER_URI}${window.location.pathname}`);
        const req = await fetch(`${config.SERVER_URI}${window.location.pathname}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await req.json();

        if(data.success){
            setMovies(data.movies);
            setPlaylist(data.playlist);
            setError('');
        } else{
            setError(data.error);
        }

    }

    useEffect(() => {
        //fetch the playlist and its movies
        getPlaylists()
    }, [])

    return (
        <div>           
            <div>
                <HeaderContainer>
                    <Logo>
                        <LogoTitle>ISHAN007 MOVIES</LogoTitle>
                    </Logo>
                    <NavBar>
                        <NavItem to="/dashboard">Dashboard</NavItem>      
                        <UserName>Hi !!!<br/></UserName>  
                    </NavBar>
                    
                </HeaderContainer>
                <ContentContainer>
                    <PlaylistContainer>
                        <PlaylistsContainer>
                            <PlaylistDiv>
                                <div>
                                    {playlist && playlist.name}
                                </div>
                            </PlaylistDiv>
                        </PlaylistsContainer>                        
                    </PlaylistContainer>
                    <Divider></Divider>
                    <Container>
                        <MoviesContainer>
                            {movies.map(movie => 
                                
                                    <MovieContainer id={movie.imdbID}>
                                        <Img src={movie.Poster} alt={movie.Title}/>
                                        <P>Title: {movie.Title}</P>
                                        <P>Year: {movie.Year}</P>
                                    </MovieContainer>
                                
                            )}
                        </MoviesContainer>                       
                    </Container>
                </ContentContainer>              
            </div>               
        </div>
    )
}

export default ListView

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

const PlaylistContainer = styled.div`
    width: 40%;
    text-align: center;
    font-size: 20px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    font-size: 15px;
`;

const PlaylistsContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-top:20px;
    width: 100%;
`;

const PlaylistDiv = styled.div`
    border-bottom: 0.25px solid black;
    padding: 15px;
    background-color: ${props => props.selected ? 'lightgrey' : 'none'};
    &:hover {
        background-color: lightgrey;
    }
    display: flex;
    justify-content: space-between;
`;

const Container = styled.div`
    background-color: lightgrey;
    flex-grow: 1;
    width: 100%;
`

const MoviesContainer = styled.div`
    display: flex;
    flex: 1 0 100%;
    gap:20px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 5px;
`;

const Img = styled.img`
    width: 150px;
    height: 170px;  
`;

const P = styled.p`
    width: 150px;
    font-size: 12px;
    margin:0
`

const MovieContainer = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    display:flex;
    flex-direction:column;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
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

const LogoTitle = styled.p`
    font-size: 20px;
`;

const NavBar = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;
    background-color: #27242B;
    height: 100%;
    align-items: center;
    gap: 20px;
`;

const NavItem = styled(Link)`
    color: grey;
    cursor: pointer;
    text-align: center;
    color: ${props => props.show ? 'white' : 'none'};
    &:hover {
        color: white;
    }
    margin-right: 30px;
    text-decoration: none;
`;


const UserName = styled.p`
    margin-right: 50px;
    color: grey;
`
