import React, {useContext, useState} from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChartLine, faPlus, faGear, faMoon, faSun, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { CredentialsContext } from './context/CredentialsContext';
import { DarkModeContext } from './context/DarkModeContext';
import useComponent from './hooks/useComponent';

function App() {
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {darkMode, setDarkMode} = useContext(DarkModeContext);
  const {Div} = useComponent()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    console.log(event.currentTarget)
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Logout = () => {
    handleClose()
    localStorage.removeItem('SebMediaCredentials')
    setStoredCredentials(null)
  }

  const navStyle = {
    marginRight: '5%',
    fontSize: 35
  }

  const darkLightModeIconStyle = {
    fontSize: 35,
    marginLeft: 10,
    cursor: 'pointer'
  }
  return (
    <Div>
      <header style={{borderBottomColor: darkMode ? 'white' : 'black'}}>
        <div>
          <h1>SebMedia 2.0</h1>
          <button style={{background: 'none', margin: 0, padding: 0, border: 'none'}} onClick={() => {setDarkMode(!darkMode)}}>
            {darkMode ?
              <FontAwesomeIcon icon={faSun} style={{...darkLightModeIconStyle, color: 'white'}}/>
            :
              <FontAwesomeIcon icon={faMoon} style={{...darkLightModeIconStyle, color: 'black'}}/>
            }
          </button>
        </div>
        <div>
          <NavLink to="home" style={navStyle}>
            <FontAwesomeIcon icon={faHouse}/>
          </NavLink>
          <NavLink to="search" style={navStyle}>
            <FontAwesomeIcon icon={faMagnifyingGlass}/>
          </NavLink>
          <NavLink to="profile" style={navStyle}>
            <FontAwesomeIcon icon={faChartLine}/>
          </NavLink>
          <NavLink to="posts" style={navStyle}>
            <FontAwesomeIcon icon={faPlus}/>
          </NavLink>
          <NavLink to="settings" style={navStyle}>
            <FontAwesomeIcon icon={faGear}/>
          </NavLink>
        </div>
      </header>
      {storedCredentials ? <Outlet/> : <Navigate to="login"/>}
    </Div>
  );
}

export default App;
