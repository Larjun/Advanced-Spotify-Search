import React, { useEffect }  from 'react';
import { useStateProvider } from '../utils/StateProvider';
import axios from "axios";
import { reducerCases } from '../utils/Constants';
import styledComponent from 'styled-components';

export default function Playlists() {
        const [{ token, playlists }, dispatch] = useStateProvider();
        console.log(token);
        useEffect(() => {
            const getPlaylistData = async () => {
                const response = await axios.get("https://api.spotify.com/v1/me/playlists", 
                {
                    headers: {  
                        Authorization: "Authorization: Bearer " + token,
                        "Content-Type": "application/json",
                    },
                }
            );
            const { items } = response.data
            console.log(response);
            console.log(items);
            const playlists = items.map(({name, id}) => {
                return { name, id };
            });
            console.log(playlists);
            dispatch({type:reducerCases.SET_PLAYLISTS, playlists});
        };
        getPlaylistData();
        }, [token, dispatch])
    return (
    <Container>
        <h1>Your Playlists</h1>
        <ul>
            {playlists.map(({name, id}) => {
                    return <li key={id}>{name}</li>
            })}
        </ul>
    </Container>
  )
}

const Container = styledComponent.div`

h1 {
    display: flex;
    flex-direction: column;
    
    padding: 0rem 2rem;
    font-weight: 5+00;
    font-size: 1.5vh;
    display: flex;
  }

ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    
    gap: 2.5rem;
    padding: 2rem;

    li {
      font-size: 1.1vh;
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