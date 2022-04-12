import React from 'react'
import spotifyTextLogo from './../assets/spotifyTextLogo.png'
import styledComponents from 'styled-components';



export default function Login() {

    const handleClick = () => {
        const clientId = '9fb65ca2e3a5490cbed358388fc18998';
        const redirectUrl = "http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = [
            'user-read-email', 
            'user-read-private', 
            'user-modify-playback-state', 
            'user-read-playback-state',
            'user-read-currently-playing',
            'user-read-recently-played',
            'user-read-playback-position',
            'user-top-read'
        ];
        window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}
        &response_type=token&show_dialogue=true`;
    };
    
  return( 
    <Container> 
        <img src={spotifyTextLogo} alt="spotifyTextLogo" />
        <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  );
};

const Container = styledComponents.div` 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100%;
    background-color: black;
    gap: 5rem;

    img {
        height: 20vh;
    }
    button {
        padding: 1rem 5rem;
        border-radius: 5rem;
        border: none;
        background-color: var(--color-spotify);
        font-size: 1.4rem;
        font-family: 'Raleway', sans-serif;
        font-weight: 600;
        cursor: pointer;
    }
    `;
