import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components';
import PlaylistContext from '../context/playlistContext';
import AddIcon from '@material-ui/icons/Add';
import Add from '@material-ui/icons/Add';
import UserContext from '../context/userContext';
import Playlist from './Playlist';
import CurrentPlaylistContext from '../context/currentPlaylistContext';

const config = require('../config/config');

const SideBarPlaylists = () => {

    const { userData, setUserData } = useContext(UserContext); //this has token and the current user

    const [newPlaylistName, setNewPlaylistName] = useState('');

    //all playlists of user to be set to this context
    const {currentPlaylists, setCurrentPlaylists} = useContext(PlaylistContext);

    //public or private
    const [isPublic, setIsPublic] = useState(false);

    //active selected playlist
    const {selectedPlaylistId, setSelectedPlaylistId} = useContext(CurrentPlaylistContext);


    async function createPlaylist(event){
        event.preventDefault();

        const token = localStorage.getItem('token');

        const req = await fetch(`${config.SERVER_URI}/api/addplaylist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                userdata: userData,
                playlist: newPlaylistName,
                is_public: isPublic
            })
        });

        const data = await req.json();
        if(data.success){
            setCurrentPlaylists([data.playlist, ...currentPlaylists]);
            setNewPlaylistName('');
        }
    }

    async function fetchPlaylists(){
        const token = localStorage.getItem('token');

        const req = await fetch(`${config.SERVER_URI}/api/getplaylists`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify({
                userdata: userData,
            })
        });

        const data = await req.json();

        if(data.success){
            setCurrentPlaylists(data.playlists);
        }
    }

    useEffect(() => {
        //fetch current user's playlist by doing a get request to server and set it to currentPlaylists
        // getPlaylists();
        fetchPlaylists();
    }, [userData]);

    return (
        <PlaylistContainer>
            <Title>
                <Form onSubmit={createPlaylist}>
                    <InputContainer>
                        <Input 
                            type="text" 
                            value={newPlaylistName} 
                            placeholder="Create new playlist"
                            required  
                            onChange={(e) => setNewPlaylistName(e.target.value) }
                        />
                        <Select onChange={e => setIsPublic(e.target.value)}>
                            <option value={false}>Private</option>
                            <option value={true}>Public</option>
                        </Select>
                    </InputContainer>
                       
                    <ButtonContainer type="submit"><AddIcon /></ButtonContainer>                 
                </Form>      
            </Title>
            <PlaylistsContainer>
                {
                    currentPlaylists.map(item => <Playlist selected={false} 
                                            key={item._id} 
                                            _id={item._id}  
                                            name={item.name} 
                                            isPublic={item.is_public}  
                                            selectPlaylistId={selectedPlaylistId}
                                            setSelectPlaylistId={setSelectedPlaylistId}                                             
                                            />)
                }
            </PlaylistsContainer>

        </PlaylistContainer>
    )
}

export default SideBarPlaylists


const PlaylistContainer = styled.div`
    width: 40%;
    text-align: center;
    font-size: 20px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    font-size: 15px;
`;

const Title = styled.div`    
        
`;

const Form = styled.form`
    align-items: center;
    display: flex;
    margin-left: 10px;
    justify-content: space-between;
`

const ButtonContainer = styled.button`
    cursor: pointer;
    background-color: Transparent;
    border: none;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 70%;
`;

const Input = styled.input`
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 0.5px solid black;
`;

const Select = styled.select`
    border: none;
    border-bottom: 0.5px solid black;
    outline: none;
    background-color: white;
`;

const PlaylistsContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding-top:20px;
    width: 100%;
`;
