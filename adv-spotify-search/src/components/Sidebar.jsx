import React from 'react'
import styledComponents from 'styled-components'
import spotifyTextLogo from './../assets/spotifyTextLogo.png';
import {IoLibrary} from 'react-icons/io5';
import { MdHomeFilled, MdSearch } from "react-icons/md";
import Playlists from './Playlists';

export default function Sidebar() {
  const navToSearch = () => {

  }

  return (
    <Container>
      <div className="top__links">
        <div className="logo">
          <img src={spotifyTextLogo} alt=""/>
        </div>
        <ul>
          <li>
            <MdHomeFilled />
            <span>Home</span>
          </li>
          <li>
            <MdSearch />
            <span>Search</span>
          </li>
          <li>
            <IoLibrary />
            <span onClick={navToSearch}>Your Library</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </Container>
  )
}

const Container = styledComponents.div`
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