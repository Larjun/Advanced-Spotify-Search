import React, { useEffect, useState }  from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from "axios";
import { reducerCases } from '../utils/Constants';
import styled from 'styled-components';
import SpotifyWebApi from 'spotify-web-api-node';

const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new SpotifyWebApi({
    clientId: clientId
})

export default function Playlists(playlistArr) {
      const [playlist, setPlaylistData] = useState([])
      const token = window.location.hash.substring(1).split("&")[0].split('=')[1];
      
      
      useEffect(() => {
        setPlaylistData([])
        spotifyApi.setAccessToken(token)
        const pl = playlistArr.playlists.playlists[0]
        let it = 0
        if (pl && it == 0) {
          console.log("Playlist Length: " + pl.length)
          pl.forEach(async i => {
            const plInfo = await spotifyApi.getPlaylist(i.playlistId)
            if(!playlist.includes({'name': plInfo.body.name, 'url': plInfo.body.external_urls.spotify, 'id': plInfo.body.id})){
              setPlaylistData(curr => [...curr, {'name': plInfo.body.name, 'url': plInfo.body.external_urls.spotify, 'id': plInfo.body.id}])
              it++
            } else {
              setPlaylistData([])
            }
          })
        }
      }, [playlistArr, token])
      
    return (
    <Container>
        <h1>Your Playlists</h1>
        <ul>
          {console.log(playlist)}
          {
          [...new Set(playlist)].map(p => {
            return <li key={p.id}><a href={p.url}>{p.name}</a></li>
          })
          }
        </ul>
    </Container>
  )
}

const Container = styled.div`
height: 100%;

a {
  color: inherit;
  $hover {
    color: inherit
  }
  text-decoration: inherit;
}

h1 {
    display: flex;
    flex-direction: column;
    
    padding: 0rem 2rem;
    font-weight: 600;
    font-size: 1.5vh;
    display: flex;
  }

ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    
    gap: 2.5rem;
    padding: 2rem;
    height: 55vh;
    max-height: 100%;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.4rem;
      &-thumb {
        background-color: rgba(255,255,255,0.6)
      }
      &:hover {
        background-color: rgba(255,255,255,0.3)
      }
    }
    li {
      font-size: 1.3vh;
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      overflow: none;
      &:hover {
        color: white;
      }
    }
  }
`;