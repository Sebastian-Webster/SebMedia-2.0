import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <h1 style={{marginBottom: 0}}>Welcome to SebMedia!</h1>
            <h3>Login here...</h3>
            <form>
                <label htmlFor="email">Email:</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="email"/>
                <label htmlFor="password">Password: </label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="password"/>
                <input type="submit" value='Login'/>
            </form>
            <h1>You may want to <Link to='/signup'>signup instead</Link></h1>
        </div>
    )
}

export default Login;