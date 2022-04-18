import React, {useEffect} from 'react';
import styledComponent from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';
import SearchBody from './SearchBody';
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node';

//console.log("Doing Stuff")

const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new SpotifyWebApi({
    clientId: clientId
})

export default function Spotify(Token) {
    //console.log("Token is: " + Token)
    const spotifyToken = window.location.hash.substring(1).split("&")[0].split('=')[1]

    spotifyApi.setAccessToken(spotifyToken)
    spotifyApi.getMe()
    .then(function(data) {
        console.log(data.body.id);
        var currUser = data.body.id
        axios.post('http://localhost:3001/init', {
            token: spotifyToken,
            userId: currUser
            
        }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    });
    
    return (
        <Container>
            <div className='spotify__body'>
                <Sidebar />
                <div className='body'>
                    <Navbar />
                    <div className='body-contents'>
                        <SearchBody />
                        
                    </div>
                </div>
            </div>
            <div className='spotify__footer'>
                <Footer/>
            </div>
        </Container>
    );
};

const Container = styledComponent.div`
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: grid;
    grid-template-rows: 85vh 15vh;
    .spotify__body {
        display: grid;
        grid-template-columns: 15vw 85vw;
        height: 100%;
        width: 100%;
        background: linear-gradient(transparent, rgba(0,0,0,1));
        background-color: rgb(32, 15, 100);
        .body {
            height: 100%;
            width: 100%;
            overflow: auto;
        }
    }
    `;