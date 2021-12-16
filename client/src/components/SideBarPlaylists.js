import React from 'react'
import styled from 'styled-components'

const SideBarPlaylists = () => {
    return (
        <PlaylistContainer>
            Movie Playlists
        </PlaylistContainer>
    )
}

export default SideBarPlaylists


const PlaylistContainer = styled.div`
    width: 40%;
    text-align: center;
`;