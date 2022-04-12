import React, { useState } from 'react'
import spotifyTextLogo from '../../assets/spotifyTextLogo.png'
import './Navbar.scss';

//We don't have to have a menu, I just know how to make them so I added it for now 

const Navbar = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
         <img src={spotifyTextLogo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {['home', 'about'].map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <a href={`#${item}`}>
              {item}
            </a>
          </li>
        ))}
      </ul> 
    </nav>
  )
}

export default Navbar