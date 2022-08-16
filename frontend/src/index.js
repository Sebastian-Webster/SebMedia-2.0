import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Profile from './routes/Profile';
import Posts from './routes/Posts';
import { CredentialsContext } from './context/CredentialsContext';
import Login from './routes/Login';
import Signup from './routes/Signup';
import PageNotFound from './routes/PageNotFound';
import Settings from './routes/Settings';
import CreateTextPost from './routes/CreateTextPost';
import { DarkModeContext } from './context/DarkModeContext';
import CreateImagePost from './routes/CreateImagePost';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ComponentToRender = () => {
  const [storedCredentials, setStoredCredentials] = useState(JSON.parse(localStorage.getItem('SebMediaCredentials')));
  const [darkMode, setDarkMode] = useState(/*window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : true*/false)

  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    //setDarkMode(event.matches)
});

  return (
    <div style={{height: '100vh', backgroundColor: darkMode ? 'black' : 'white', color: darkMode ? 'white' : 'black'}}>
      <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
        <DarkModeContext.Provider value={{darkMode, setDarkMode}}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App/>}>
                <Route path="home" element={<Home/>}/>
                <Route path="posts" element={<Posts/>}>
                  <Route path="createTextPost" element={<CreateTextPost/>}/>
                  <Route path="createImagePost" element={<CreateImagePost/>}/>
                </Route>
                <Route path="profile" element={<Profile/>}/>
                <Route path="settings" element={<Settings/>}/>
              </Route>
              <Route path="login" element={<Login/>}/>
              <Route path="signup" element={<Signup/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Routes>
          </BrowserRouter>
        </DarkModeContext.Provider>
      </CredentialsContext.Provider>
    </div>
  )
}

root.render(
  <ComponentToRender/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
