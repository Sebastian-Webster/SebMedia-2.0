import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import Posts from './routes/Posts';
import { CredentialsContext } from './context/CredentialsContext';
import Login from './routes/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));

const ComponentToRender = () => {
  const [storedCredentials, setStoredCredentials] = useState(null);
  return (
    <CredentialsContext.Provider value={{storedCredentials, setStoredCredentials}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="home" element={<Home/>}/>
            <Route path="posts" element={<Posts/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
          </Route>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </CredentialsContext.Provider>
  )
}

root.render(
  <ComponentToRender/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
