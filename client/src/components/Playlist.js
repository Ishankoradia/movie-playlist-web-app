import styled from 'styled-components';
import { React, useContext} from 'react';
import PlaylistContext from '../context/playlistContext';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../context/userContext';

const config = require('../config/config');

const Playlist = ({name, _id}) => {
    const {currentPlaylists, setCurrentPlaylists} = useContext(PlaylistContext);

    const { userData, setUserData } = useContext(UserContext);

    async function deletePlaylist(){
        const token = localStorage.getItem('token');

        const req = await fetch(`${config.SERVER_URI}/api/deleteplaylist`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                userdata: userData,
                _id: _id
            })
        });

        const data = await req.json();

        if(data.success){
            setCurrentPlaylists(currentPlaylists.filter(item => item._id !== _id));
        }
    }

    return (
        <PlaylistDiv>
            {name}
            <StyleDeleteIcon onClick={deletePlaylist} />
        </PlaylistDiv>
    )
}

export default Playlist

const PlaylistDiv = styled.div`
    border-bottom: 0.25px solid black;
    padding: 15px;
    &:hover {
        background-color: lightgrey;
    }
    display: flex;
    justify-content: space-between;
`;

const StyleDeleteIcon = styled(DeleteIcon)`
    cursor: pointer;
    color: darkred;
`;