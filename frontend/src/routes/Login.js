import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CredentialsContext } from '../context/CredentialsContext';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const [rememberMe, setRememberMe] = useState(true);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const url = 'http://localhost:8080/user/login'
        const toSend = {email, password}

        axios.post(url, toSend).then(result => {
            setLoading(false)
            setStoredCredentials(result.data.data)
            if (rememberMe) localStorage.setItem('SebMediaCredentials', JSON.stringify(result.data.data))
            navigate('/home')
        }).catch(error => {
            setLoading(false)
            setError(error?.response?.data?.error || 'Unknown error occured')
            console.error(error)
        })
    }

    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1 style={{marginBottom: 0}}>Welcome to SebMedia!</h1>
            {loading ?
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                    <CircularProgress/>
                </Box>
            :
                <>
                    <form onSubmit={handleLogin} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <h3>Login here...</h3>
                        <label htmlFor="email">Email:</label>
                        <br/>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email"/>
                        <br/>
                        <label htmlFor="password">Password: </label>
                        <br/>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password"/>
                        <br/>
                        <label htmlFor='rememberMe'>Remember Me</label>
                        <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} name="rememberMe"/>
                        <br/>
                        <input type="submit" value='Login'/>
                        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                    </form>
                    <h1>You may want to <Link to='/signup'>signup instead</Link></h1>
                </>
            }
        </div>
    )
}

export default Login;