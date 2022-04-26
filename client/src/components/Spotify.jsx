import React, {useEffect} from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';
import SearchBody from './SearchBody';
import axios from 'axios'
import SpotifyWebApi from 'spotify-web-api-node';
import { useStateProvider } from '../utils/StateProvider';
import { reducerCases } from '../utils/Constants';
import AdvSearch from './AdvSearch';




const clientId = 'd677f29341d8486f90c37f08fe86a25e'
const spotifyApi = new SpotifyWebApi({
    clientId: clientId
})


export default function Spotify(Token) {

    const [{ token }, dispatch] = useStateProvider();

    useEffect(()=> {
        const getUserInfo = async ()=> {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
                headers: {  
                    Authorization: "Authorization: Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            console.log({ data });
            const userInfo = {
                userId: data.id,
                userName: data.display_name,
            }; 
            dispatch({type:reducerCases.SET_USER, userInfo})
        }; 
    getUserInfo();
    }, [dispatch, token])


    //console.log("Token is: " + Token)
    const spotifyToken = window.location.hash.substring(1).split("&")[0].split('=')[1]
   
    useEffect(() => {
        var initialized = false;
    
        if(!initialized) {
            spotifyApi.setAccessToken(spotifyToken)
            spotifyApi.getMe()
            .then(function(data) {
                console.log(data.body.id);
                var currUser = data.body.id
                    spotifyApi.getUserPlaylists(currUser).then(pl => {
                        axios.post('http://localhost:3000/init', {
                            token: spotifyToken,
                            userId: currUser,
                            playlists: pl.body.items
                        }).then(function (response) {
                            console.log(response);
                            console.log(initialized)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    }).catch(err => {
                       console.log(err) 
                    })
                    initialized = true
                });
        }
                
    }, [])
    return (
        <Container>
            <div className='spotify__body'>
                <Sidebar />
                <div className='body'>
                    <Navbar />
                    <div className='body-contents'>
                        <AdvSearch />
                    </div>
                </div>
            </div>
            <div className='spotify__footer'>
                <Footer/>
            </div>
        </Container>
    );
};

const Container = styled.div`
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