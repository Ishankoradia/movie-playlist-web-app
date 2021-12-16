import { React, useState, useEffect, useContext } from 'react'
import PlaylistContext from '../context/playlistContext';
import '../styles/saveMovieModal.css';

const Modal = ({show}) => {
    const [checkedState, setCheckedState] = useState([]);

    const {currentPlaylists, setCurrentPlaylists} = useContext(PlaylistContext);

    useEffect(() => {
        setCurrentPlaylists([{name: 'recipe', _id: "1"}, {name: 'exercise', _id: "2"}])
    }, [currentPlaylists])

    if(!show){
        return null
    }
  

    const savePlaylists = []

    function handleCheckboxClick(e){
        
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">                   
                    <p className="modal-title">Save video to...</p><button>x</button>               
                </div>
                <div className="modal-body">
                    {(currentPlaylists.length > 0) ? currentPlaylists.map(item => 
                        <div><input 
                                type="checkbox" 
                                id={item._id} 
                                name="recipe" 
                                value="recipe"
                                onClick={handleCheckboxClick} 
                            /> {item.name}</div>) :
                        <div>Please create a new playlist</div>
                    }
                </div>
                <div className="modal-footer">
                    <button className="button" >Done</button>
                </div>
            </div>            
        </div>
    )
}

export default Modal
