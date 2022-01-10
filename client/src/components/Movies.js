import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import SearchIcon from '@material-ui/icons/Search';
import Loader from 'react-loader-spinner';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIosRounded';
import SaveMovieModal from './SaveMovieModal';

const Movies = () => {

    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalpages, setTotalPages] = useState(1);
    const [showModal, setShowModal] = useState(false); //setShowModal(false)

    const [error, setError] = useState({
        success: true,
        error: ''
    })

    async function fetchMovies(){
        setError({
            success: false,
            error: ''
        })
        setLoading(true);
        fetch(`https://www.omdbapi.com/?apikey=6160d56&s=${search}&page=${page}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
            if (response.Response === 'True') {
                setError({
                    success: true,
                    error: ''
                })
                setTotalPages(Math.ceil(response.totalResults/10));
            }
            else {
                setError({
                    success: false,
                    error: response.Error
                })
            }
            setMovies(response.Search || []);
            setLoading(false);
        })
        .catch(({message}) => {
            
        })
        
    }

    useEffect(() => {
        
        fetchMovies();
        
    }, [page])

    function searchMovies(event){
        event.preventDefault();
        setPage(1); 
        fetchMovies();      
    }

    function prevPage(){
        if(page > 1){
            setPage(page-1);
        }
    }

    function nextPage(){
        if(page < totalpages){
            setPage(page+1);
        }
    }    

    return (
        <Container>
            <SearchContainer>
                <Input 
                    type="text" 
                    placeholder="Search Movies" 
                    aria-label="Search"
                    value={search}
                    onChange={(e) => {setSearch(e.target.value)}}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                          searchMovies(event)
                        }
                      }}
                    
                />
                
                <StyledSearchIcon onClick={searchMovies} />
            </SearchContainer>
            {(loading) &&
            <StyleLoader>
                <Loader 
                    type="ThreeDots"
                    color="#00BFFF"
                    timeout={5000}                
                /> 
            </StyleLoader>
            } 
            {(error.success) ?
            <MoviesContainer> 
                {movies.map(m => <Movie key={m.imdbID} m={m} setShow={setShowModal}/>)}                
            </MoviesContainer>  :
            <StyleLoader>
                {error.error}
            </StyleLoader>
            }
            
            {(error.success) &&
            <Footer>
                <StyleArrowPrev onClick={prevPage}/>
                <P>page {page} of {totalpages}</P>
                <StyleArrowNext onClick={nextPage}/>
            </Footer>
            }
            {<SaveMovieModal show={showModal} setShow={setShowModal} />}
            
        </Container>
       
    )
}

export default Movies

const MoviesContainer = styled.div`
    display: flex;
    flex: 1 0 100%;
    gap:20px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 5px;
`;

const Container = styled.div`
    background-color: lightgrey;
    flex-grow: 1;
    width: 100%;
    padding-top: 10px;
`

const SearchContainer = styled.div`
    justify-content: center;
    display: flex;
    padding: 10px;
    height: 30px;
    position: relative;
`;

const Input = styled.input`
    border: none;
    width: 30%;
    padding-right: 50px;
    &:focus {
        outline: 1px solid #27242B;
    }
`

const StyledSearchIcon = styled(SearchIcon)`
    cursor: pointer;
    position: absolute;
    right: 275px;
`

const StyleLoader = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    margin-top: 20%;
`;

const Footer = styled.div`
padding-top: 10px;
text-align: center;
display: flex;
align-items: center;
justify-content: center;
`;

const FooterContainer = styled.div``;

const P = styled.p`
    width: 100px;
    font-size: 12px;
    margin:0
`

const StyleArrowNext = styled(ArrowForwardIcon)`
    cursor: pointer;
`

const StyleArrowPrev = styled(ArrowBackIcon)`
    cursor: pointer;
`