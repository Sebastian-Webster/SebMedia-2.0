import React, {useContext} from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChartLine, faPlus, faGear, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { CredentialsContext } from './context/CredentialsContext';
import { DarkModeContext } from './context/DarkModeContext';
import useComponent from './hooks/useComponent';

function App() {
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
  const {darkMode, setDarkMode} = useContext(DarkModeContext);
  const {Div} = useComponent()

  const navStyle = {
    marginRight: '5%'
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
          <h1>SebMedia</h1>
          {/*
          <button style={{background: 'none', margin: 0, padding: 0, border: 'none'}} onClick={() => {setDarkMode(!darkMode)}}>
            {darkMode ?
              <FontAwesomeIcon icon={faSun} style={{...darkLightModeIconStyle, color: 'white'}}/>
            :
              <FontAwesomeIcon icon={faMoon} style={{...darkLightModeIconStyle, color: 'black'}}/>
            }
          </button>
          */}
        </div>
        <div>
          <NavLink to="home" style={navStyle}>
            <FontAwesomeIcon icon={faHouse}/>
          </NavLink>
          <NavLink to="profile" style={navStyle}>
            <FontAwesomeIcon icon={faChartLine}/>
          </NavLink>
          <NavLink to="posts" style={navStyle}>
            <FontAwesomeIcon icon={faPlus} style={navStyle}/>
          </NavLink>
          <NavLink to="settings" style={navStyle}>
            <FontAwesomeIcon icon={faGear} style={navStyle}/>
          </NavLink>
        </div>
      </header>
      {storedCredentials ? <Outlet/> : <Navigate to="login"/>}
    </Div>
  );
}

export default App;
