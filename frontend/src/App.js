import React, {useContext} from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faChartLine, faPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import './App.css'
import { CredentialsContext } from './context/CredentialsContext';

function App() {
  const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);

  const navStyle = {
    marginRight: '5%'
  }
  return (
    <div>
      <header>
        <div>
          <h1>SebMedia</h1>
        </div>
        <div>
          <NavLink to="home" style={navStyle}>
            <FontAwesomeIcon icon={faHouse}/>
          </NavLink>
          <NavLink to="dashboard" style={navStyle}>
            <FontAwesomeIcon icon={faChartLine}/>
          </NavLink>
          <NavLink to="posts" style={navStyle}>
            <FontAwesomeIcon icon={faPlus} style={navStyle}/>
          </NavLink>
        </div>
      </header>
      {storedCredentials ? <Outlet/> : <Navigate to="login"/>}
    </div>
  );
}

export default App;
