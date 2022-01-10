import { React, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../context/userContext';
import CurrentPlaylistContext from '../context/currentPlaylistContext';
import { toast } from "react-toastify";

const config = require('../config/config');

const PlaylistMovie = ({movie, refComp, setRefComp}) => {

    const { userData, setUserData } = useContext(UserContext);

    const {selectedPlaylistId, setSelectedPlaylistId} = useContext(CurrentPlaylistContext);

    async function deleteMovie(){
        const token = localStorage.getItem('token');

        const req = await fetch(`${config.SERVER_URI}/api/playlists/${selectedPlaylistId}/movies/${movie._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            }
        });

        const data = await req.json();

        if(data.success){
            setRefComp(!refComp);
            toast.info("Movie deleted successfully");
        }
    }

    return (
        <MovieContainer id={movie.imdbID}>
            <Img src={movie.Poster} alt={movie.Title}/>
            <P>Title: {movie.Title}</P>
            <P>Year: {movie.Year}</P>
            <IconContainer onClick={deleteMovie}>
                <StyleDeleteIcon/>
            </IconContainer>
        </MovieContainer>
    )
}

export default PlaylistMovie

const MovieContainer = styled.div`
    position: relative;
    width: fit-content;
    height: fit-content;
    display:flex;
    flex-direction:column;
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

const IconContainer = styled.div`
    position: absolute;
    top:0;
    right:0;    
    background-color: white;
    cursor: pointer;
`;

const StyleDeleteIcon = styled(DeleteIcon)`
    cursor: pointer;
    color: #D9352F;
`;