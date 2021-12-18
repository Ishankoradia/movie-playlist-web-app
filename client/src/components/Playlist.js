import styled from 'styled-components';
import { React, useContext} from 'react';
import PlaylistContext from '../context/playlistContext';
import DeleteIcon from '@material-ui/icons/Delete';
import UserContext from '../context/userContext';
import PublicIcon from '@material-ui/icons/Public';
import PrivateIcon from '@material-ui/icons/Lock';
import CopyLinkIcon from '@material-ui/icons/FileCopy';
import CurrentPlaylistContext from '../context/currentPlaylistContext';

const config = require('../config/config');

const Playlist = ({name, _id, isPublic}) => {
    const {currentPlaylists, setCurrentPlaylists} = useContext(PlaylistContext);

    const { userData, setUserData } = useContext(UserContext);

    const {selectedPlaylistId, setSelectedPlaylistId} = useContext(CurrentPlaylistContext);

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
            if(selectedPlaylistId === _id){
                setSelectedPlaylistId(false);
            }
        }
    }

    function copyPlaylistLink(){
        navigator.clipboard.writeText(`${window.location.origin}/playlistview/${_id}`);
    }

    function onPlaylistClick(){
        if(selectedPlaylistId === _id){
            setSelectedPlaylistId(false);
        } else{
            setSelectedPlaylistId(_id);
        }
    }

    return (
        <PlaylistDiv selected={selectedPlaylistId === _id}>
            <NameContainer onClick={onPlaylistClick}>
            {name}
            </NameContainer>
            <IconContainer>
                {isPublic && <StyleCopyLinkIcon onClick={copyPlaylistLink} /> }
                {isPublic ? <StylePublicIcon /> :  <StylePrivateIcon />}
                <StyleDeleteIcon onClick={deletePlaylist} />
            </IconContainer>            
        </PlaylistDiv>
    )
}

export default Playlist

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

const StyleDeleteIcon = styled(DeleteIcon)`
    cursor: pointer;
    color: darkred;
`;

const StylePublicIcon = styled(PublicIcon)`
    color: 	#696969;
`;

const StylePrivateIcon = styled(PrivateIcon)`
    color: 	#696969;
`;

const IconContainer = styled.div`
    display: flex;
    gap:4px;
`;

const StyleCopyLinkIcon = styled(CopyLinkIcon)`
    cursor: pointer;
`;

const NameContainer = styled.div`
    cursor: pointer;
`;