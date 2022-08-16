import React, {useState, useContext, useEffect} from 'react';
import { CredentialsContext } from '../context/CredentialsContext';
import useInput from '../hooks/useInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, TextField, Grid } from '@mui/material';
import { useFilePicker } from 'use-file-picker';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import ImagePost from '../components/ImagePost';

const CreateImagePost = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [title, bindTitle] = useInput('', 'title')
    const [body, bindBody] = useInput('', 'body')
    const navigate = useNavigate();
    const [openFilePicker, { plainFiles: imageToUpload }] = useFilePicker({accept: 'image/jpeg', multiple: false})

    const uploadImagePost = (e) => {
        e.preventDefault()

        setLoading(true)

        const toSend = new FormData();

        toSend.append('image', imageToUpload[0])
        toSend.append('title', title)
        toSend.append('body', body)
        toSend.append('userId', _id)

        axios.post('http://localhost:8080/user/imagePost', toSend, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }).then(result => {
            navigate('/home')
        }).catch(error => {
            console.error(error)
            setError(error?.response?.data?.error || String(error))
            setLoading(false)
        })
    }

    useEffect(() => {
        if (imageToUpload[0]) {
            var file = imageToUpload[0]
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) => {
                setImagePreview(reader.result)
            }
        }
    }, [imageToUpload])

    return (
        <>
            <h1>Create Image Post</h1>
            {loading ? 
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            :
                <>
                    <form onSubmit={uploadImagePost} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <TextField {...bindTitle}/>
                        <TextField {...bindBody} multiline style={{marginBottom: 10}}/>
                        <Fab color="secondary" aria-label="add" variant="extended" onClick={openFilePicker}>
                            {imagePreview ?
                                <>
                                    <EditIcon />
                                    Change Image
                                </>
                            :
                                <>
                                    <AddIcon />
                                    Image
                                </>
                            }
                        </Fab>
                        {title && body && imagePreview &&
                            <Fab color="primary" aria-label="submit" type="submit" variant="extended" sx={{mt: 2}}>
                                <AddIcon />
                                Submit
                            </Fab>
                        }
                        {error && <p style={{color: 'red'}}>{error}</p>}
                    </form>
                    <h2>Preview:</h2>
                    {title && body && imagePreview ?
                        <Grid container sx={{justifyContent: 'center'}}>
                            <ImagePost title={title} body={body} previewImage={imagePreview}/>
                        </Grid>
                    :
                        <>
                            <h2>Preview is waiting for a title, body, AND image</h2>
                            <Box sx={{justifyContent: 'center'}}>
                                <CircularProgress/>
                            </Box>
                        </>
                    }
                </>
            }
        </>
    )
}

export default CreateImagePost;