import React, { useEffect } from 'react'
import Login from './components/Login'

const App = () => {

  useEffect(()=> {
    const hash = window.location.hash;
    if(hash) {
      const token = hash.substring(1).split("&")[0].split('=')[1];
      console.log(token);
    }
  }, [])
  return (
    <div>
      <Login />
    </div>
  )
}

export default App
