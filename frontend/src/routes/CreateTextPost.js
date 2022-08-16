import React, {useContext, useState} from 'react';
import { CredentialsContext } from '../context/CredentialsContext';
import useInput from '../hooks/useInput';
import { Box, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const CreateTextPost = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;
    const [title, bindTitle] = useInput('', 'title')
    const [body, bindBody] = useInput('', 'body')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    const uploadTextPost = (e) => {
        e.preventDefault();
        setLoading(true)
        setError(null)

        const toSend = {
            title,
            body,
            userId: _id
        }

        axios.post('http://localhost:8080/user/textPost', toSend).then(response => response.data)
        .then(result => {
            setLoading(false)
            setError(null)
            navigate('/home')
        }).catch(error => {
            setLoading(false)
            setError(error?.response?.data?.error)
        })
    }

    return (
        <>
            <h1>Create Text Post</h1>
            {loading ?
                <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                    <CircularProgress/>
                </Box>
            :
                <form onSubmit={uploadTextPost} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <input {...bindTitle}/>
                    <input {...bindBody}/>
                    <input type="submit" value='Submit'/>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            }
        </>
    )
}

export default CreateTextPost;