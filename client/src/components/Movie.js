import React from 'react'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const Movie = ({movie, setShow}) => {

    function addMovie(){
        setShow(true);
    }

    return (
        <MovieContainer id={movie.imdbID}>
            {movie.Poster !== "N/A" ?
               <Img src={movie.Poster} alt={movie.Title}/> :
               <Img src={"./images/poster_not_found.png"} alt={movie.Title}/>
            }
            <P>Title: {movie.Title}</P>
            <P>Year: {movie.Year}</P>
            <IconContainer onClick={addMovie}>
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
