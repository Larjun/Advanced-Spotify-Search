import axios from "axios";
import React,{useEffect} from 'react';
import styledComponent from 'styled-components';
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../utils/StateProvider";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Body from './Body';
import Footer from './Footer';
import SearchBody from './SearchBody';


export default function Spotify(Token) {
    const [{ token}, dispatch] = useStateProvider();
    useEffect(()=> {
        const getUserInfo = async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me",{
                headers: {  
                    Authorization: "Authorization: Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            const userInfo = {
                userId: data.id,
                userName: data.display_name, 
             };
             dispatch({type:reducerCases.SET_USER,userInfo})

        };
       getUserInfo();
    },[dispatch,token]);
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