import React, {useContext, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CredentialsContext } from '../context/CredentialsContext';

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault();

        setLoading(true)
        setError(null)

        const url = 'http://localhost:8080/user/signup';
        const toSend = {
            email: email,
            password: password,
            name: name
        }
        axios.post(url, toSend).then(result => {
            setLoading(false)
            setStoredCredentials(result.data)
            navigate('/home')
        }).catch(error => {
            setLoading(false)
            setError(error?.response?.data?.message || 'Unknown error occured')
            console.error(error)
        })
    }

    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1 style={{marginBottom: 0}}>Welcome to SebMedia!</h1>
            {loading ?
                <h1>This is loading. When I learn Material UI for React in the lecture I will swap this out for a proper loading indicator.</h1>
            :
                <>
                    <h3>Signup here...</h3>
                    <form onSubmit={handleSignup}>
                        <label htmlFor="name">Name:</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} name="name"/>
                        <label htmlFor="email">Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email"/>
                        <label htmlFor="password">Password: </label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password"/>
                        <input type="submit" value='Signup'/>
                        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                    </form>
                    <h1>You may want to <Link to='/login'>login instead</Link></h1>
                </>
            }
        </div>
    )
}

export default Signup;