import React, { useState } from 'react'
import styleds from 'styled-components'
import spotifyTextLogo from '../assets/spotifyTextLogo.png';
import {IoLibrary} from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from './Playlists';
import axios from 'axios'
import spotifyWebApi from 'spotify-web-api-node'

const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new spotifyWebApi({
    clientId: clientId
})



export default function Sidebar(playlists) {
  
  const [toggleState, setToggleState] = useState(0);

  window.index = 0;

<<<<<<< HEAD
  function callSearch() {
      console.log('post request attempted')
      var danceL = 0.4
      var danceH = 0.6
      var eneL = 0.4
      var eneH = 0.9
      const searchTrack = new Promise((resolve, reject) => {
        var trackList = generateSongList(
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          10
        )
        resolve(trackList)
      }) 
      
      searchTrack.then((trackList) => {
        var playlistId
        var playlistLink
        var newTrackList = []
        for (let i = 0; i < trackList.length; i++) {
          newTrackList.push("spotify:track:" + trackList[i])
        }
        console.log(newTrackList)
        
          spotifyApi.createPlaylist('Playist Made In Adv Search', {'description' : 'Made in advance spotify search', 'public': true}).then((playlist) => {
            playlistId = playlist.body.id;
            playlistLink = playlist.body.external_urls.spotify
            spotifyApi.addTracksToPlaylist(playlistId, newTrackList).then((tracks) => {
              console.log("Added tracks to playlist: " + playlistLink)
              axios.post('https://advspotsearchserver.herokuapp.com/addPlaylist', {
                playlistId: playlistId,
                playlistLink: playlistLink
              }).then((response) => {
                console.log("Post is made successfully")
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
            }).catch((error) => {
              console.log(error)
            })
          }).catch((err) => {
            console.log(err)
          })
          
        })
=======
  const setIndex = (index) => {
    setToggleState(index);
    window.index = index;
    window.location.reload(true);
>>>>>>> 0ad216474c32d4473248094d77e1c2df2722f300
  }

  const spotifyToken = window.location.hash.substring(1).split("&")[0].split('=')[1]
  spotifyApi.setAccessToken(spotifyToken)

  return (
    <Container2>
      <div className="top__links">
        <div className="logo">
          <img src={spotifyTextLogo} alt=""/>
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span onClick={() => setIndex(0)}>Home</span>
          </li>
          <li>
            <MdSearch />
            <a><span onClick={() => setIndex(1)}>Search</span></a>
          </li>
          <li>
            <IoLibrary />
            <span onClick={() => setIndex(2)}>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlists playlists={playlists}/>
    </Container2>
  )
}

const Container2 = styleds.div`
  background-color: black;
  color: #b3b3b3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .top__links {
    display: flex;
    flex-direction: column;
    margin-bottom: 100px;
    .logo {
      text-align: center;
      margin: 1rem 0;
      img {
        max-inline-size: 80%;
        block-size: auto;
      }
    }
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    
    gap: 2.5rem;
    padding: 2rem;
    li {
      font-size: 1.4vh;
      display: flex;
      gap: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: white;
      }
    }
  }
  `;