import { React, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import PlaylistMovie from './PlaylistMovie';
import UserContext from '../context/userContext';
import CurrentPlaylistContext from '../context/currentPlaylistContext';

const config = require('../config/config');

const PlaylistMovies = () => {

    const {selectedPlaylistId, setSelectedPlaylistId} = useContext(CurrentPlaylistContext);

    const { userData, setUserData } = useContext(UserContext);

    const [movies, setMovies] = useState();

    const [refreshComp, setRefreshComp] = useState(false);

    async function fetchMovies(){
        const token = localStorage.getItem('token');

        const req = await fetch(`${config.SERVER_URI}/api/getmovies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                userdata: userData,
                playlist_id: selectedPlaylistId
            })
        });

        const data = await req.json();

        if(data.success){
            setMovies(data.movies);
        }
    }

    useEffect(() => {
        fetchMovies()
    }, [selectedPlaylistId, refreshComp])

    return (
        <Container>
            <MoviesContainer> 
                {movies && movies.map(m => <PlaylistMovie 
                                            key={m.imdbID}  
                                            movie={m} 
                                            refComp={refreshComp}
                                            setRefComp = {setRefreshComp}/>)}                
            </MoviesContainer> 
        </Container>
    )
}

export default PlaylistMovies

const Container = styled.div`
    background-color: grey;
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