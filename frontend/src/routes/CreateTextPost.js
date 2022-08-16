import React, {useContext, useState} from 'react';
import { CredentialsContext } from '../context/CredentialsContext';
import useInput from '../hooks/useInput';
import { Box, CircularProgress, TextField, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { DarkModeContext } from "../context/DarkModeContext";
import TextPost from '../components/TextPost';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

const CreateTextPost = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {darkMode, setDarkMode} = useContext(DarkModeContext);
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
                <>
                    <form onSubmit={uploadTextPost} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <TextField {...bindTitle}/>
                        <TextField {...bindBody} multiline/>
                        {title && body &&
                            <Fab color="primary" aria-label="submit" type="submit" variant="extended" sx={{mt: 2}}>
                                <AddIcon />
                                Submit
                            </Fab>
                        }
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </form>
                    <h2>Preview:</h2>
                    {!title || !body ?
                        <>
                            <h3>Preview is waiting for a title AND body to be entered...</h3>
                            <CircularProgress/>
                        </>
                    :
                        <Grid container spacing={2} sx={{justifyContent: 'center'}}>
                            <TextPost title={title} body={body}/>
                        </Grid>
                    }
                </>
            }
        </>
    )
}

export default CreateTextPost;