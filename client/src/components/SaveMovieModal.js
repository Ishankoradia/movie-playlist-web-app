import { React, useState, useEffect, useContext } from 'react'
import PlaylistContext from '../context/playlistContext';
import '../styles/saveMovieModal.css';
import CurrentMovieContext from '../context/currentMovieContext';
import UserContext from '../context/userContext';

const config = require('../config/config');

const Modal = ({show, setShow}) => {
    const { userData, setUserData } = useContext(UserContext); //this has token and the current user

    //current movie's playlists 
    const [currentMovieList, setCurrentMovieList] = useState([]);

    //movie to save
    const {currentMovie, setCurrentMovie} = useContext(CurrentMovieContext);

    const [checkedState, setCheckedState] = useState([]);
    
    //all playlists of user
    const {currentPlaylists, setCurrentPlaylists} = useContext(PlaylistContext);
    
    //save to these playlists
    const [saveToPlaylists, setSaveToPlaylists] = useState([]);

    //saved playlists: the movie to which the playlist is saved
    const [savedPlaylists, setSavedPlaylists] = useState([]);

    useEffect(() => {
        //get playlists for the current movie
        getPlaylistsOfSelectedMovie();
    }, [show, setShow])

    useEffect(() => {
        //save this movie to all the playlist selected
        setSaveToPlaylists(currentPlaylists.filter((item, index) => checkedState[index]));
        
    }, [checkedState, setCheckedState])

    function handleCheckboxChange(position) {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);        
    }

    function closeModal(){
        setShow(false);
    }

    function saveModal(){
        //post request to save the movie to the playlists checked
        saveMovie();

        setShow(false);//close the modal        
    }

    async function deleteMovies(){ //for the unselected playlists that were selected before

    }

    async function saveMovie(){ //for the newly selected playlists
        const token = localStorage.getItem('token');

        const movies = saveToPlaylists.map(item => {

            const m = {};

            Object.keys(currentMovie).map(function(key, value){
                m[key] = currentMovie[key];
            })

            m['playlist_id'] = item._id;

            return m;
        });
        
        //we dont need ti add those movie playlists that have already been added .
        const movies1 = movies.filter(item1 => savedPlaylists.length > 0 ?
            savedPlaylists.every(item2 => item1.playlist_id !== item2.playlist_id) : true);
       

        const req = await fetch(`${config.SERVER_URI}/api/savemovietoplaylists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                userdata: userData,
                movies: movies1,
            })
        });

        //movie playlists that were added before delete them if unselected {_id:adfgdf, playlist: asda}
        const deleteplaylists = savedPlaylists.filter(item1 => !movies.some(item2 => item1.playlist_id === item2.playlist_id));

        const req1 = await fetch(`${config.SERVER_URI}/api/deletemovieplaylists`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                userdata: userData,
                playlist_ids: deleteplaylists.map(item => item.playlist_id),
                movie: currentMovie
            })
        });

        const data = await req.json();

        // if(data.success){
        //     setCurrentPlaylists(data.playlists);
        // }
    }

    async function getPlaylistsOfSelectedMovie(){
        const token = localStorage.getItem('token');

        const req = await fetch(`${config.SERVER_URI}/api/getplaylistsofselectedmovie`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                userdata: userData,
                movie: currentMovie,
            })
        });

        const data = await req.json();
        const updatedCheckedState = new Array(currentPlaylists.length).fill(false);
        console.log(data.playlists);
        if(data.success){            
            data.playlists.map(item => {
                const index = currentPlaylists.findIndex(p => p._id === item.playlist_id);
                updatedCheckedState[index] = true;
            });
        }

        setCheckedState(updatedCheckedState); 

        setSavedPlaylists(data.playlists);
    }

    return (
        <div>{ show &&
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">                   
                    <p className="modal-title">Save video to...</p><button onClick={closeModal}>x</button>               
                </div>
                <div className="modal-body">
                    {(currentPlaylists.length > 0) ? currentPlaylists.map(({name, _id}, index) => 
                        <div key={currentPlaylists[index]._id}><input 
                                type="checkbox" 
                                //id={_id} 
                                value={currentPlaylists[index]}
                                checked={checkedState[index] || ''} //so that we dont get the warning of uncontrolled to controlled
                                onChange={() => handleCheckboxChange(index)} 
                            /> {name}</div>) :
                        <div>Please create a new playlist</div>
                    }
                </div>
                <div className="modal-footer">
                    <button className="button" onClick={saveModal}>Save</button>
                </div>
            </div>            
        </div>
                }
        </div>
    )
}

export default Modal
