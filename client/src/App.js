import React, { useEffect } from 'react'
import Login from './components/Login'
import Spotify from './components/Spotify';
import './App.scss';
import { reducerCases } from './utils/Constants';
import { useStateProvider } from './utils/StateProvider';
import axios from 'axios'

const App = () => {
  const [ { token }, dispatch] = useStateProvider();
  useEffect(()=> {
    const hash = window.location.hash;
    if(hash) {
      {/*Extract token from hash*/}
      console.log(hash);
      const token = hash.substring(1).split("&")[0].split('=')[1];
      console.log(token);
      dispatch({type:reducerCases.SET_TOKEN, token});
    }
  }, [token, dispatch])
  return (
    <div>
      {/* If we have a valid token, display Spotify, else display Login */}
      { token ? <Spotify /> : <Login /> } 
    </div>
  )
}

export default App
