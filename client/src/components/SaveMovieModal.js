import { React, useState, useEffect, useContext } from 'react'
import PlaylistContext from '../context/playlistContext';
import '../styles/saveMovieModal.css';
import CurrentMovieContext from '../context/currentMovieContext';

const Modal = ({show, setShow}) => {
    //movie to save
    const {currentMovie, setCurrentMovie} = useContext(CurrentMovieContext);

    const [checkedState, setCheckedState] = useState([]);
    
    //all playlists of user
    const {currentPlaylists, setCurrentPlaylists} = useContext(PlaylistContext);
    
    //save to these playlists
    const [saveToPlaylists, setSaveToPlaylists] = useState([]);

    useEffect(() => {
        //fetch current user's playlist from playlist context
        setCheckedState(new Array(currentPlaylists.length).fill(false));
    }, [show, setShow])

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
        setShow(false);//close the modal

        //save this movie to all the playlists selected
        setSaveToPlaylists(currentPlaylists.filter((item, index) => checkedState[index]));

        //post request to save the movie to the playlists checked
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
