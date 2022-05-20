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



export default function Sidebar({playlists, setToggleState}) {

  window.index = 0;

  const setIndex = (index) => {
    setToggleState(index);
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
            <span onClick={() => setIndex(0)}>Advanced Search</span>
          </li>
          <li>
            <MdSearch />
            <a><span onClick={() => setIndex(1)}>Song Lookup</span></a>
          </li>
          <li>
            <IoLibrary />
            <span onClick={() => setIndex(2)}>Recently Created</span>
          </li>
        </ul>
      </div>
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