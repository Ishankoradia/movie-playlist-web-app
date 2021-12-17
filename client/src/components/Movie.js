import { React, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CurrentMovieContext from '../context/currentMovieContext';

const Movie = ({m, setShow}) => {

    //set this to save in playlist when clicked on plus icon
    const {currentMovie, setCurrentMovie} = useContext(CurrentMovieContext);
    
    //set this movie to render on the screen with the poster link changed if not available
    const [movie, setMovie] = useState(m);

    function openSaveMovie(){
        setShow(true);
        setCurrentMovie(movie);
    }

    //change the movie's object poster link if not available
    useEffect(() => {
        if(m.Poster === "N/A"){
            m.Poster = "./images/poster_not_found.png";
            setMovie({...m});
        }
    }, [])

    return (
        <MovieContainer id={movie.imdbID}>
            <Img src={movie.Poster} alt={movie.Title}/>
            <P>Title: {movie.Title}</P>
            <P>Year: {movie.Year}</P>
            <IconContainer onClick={openSaveMovie}>
                <AddIcon />
            </IconContainer>
        </MovieContainer>
    )
}

export default Movie

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
    background-color: green;
    cursor: pointer;
`;
