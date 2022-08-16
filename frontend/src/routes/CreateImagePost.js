import React, {useRef, useState, useContext} from 'react';
import { CredentialsContext } from '../context/CredentialsContext';
import useInput from '../hooks/useInput';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
var {v4: uuidv4} = require('uuid')

const CreateImagePost = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
    const {_id} = storedCredentials;
    const [imagePreview, setImagePreview] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)
    const [title, bindTitle] = useInput('', 'title')
    const [body, bindBody] = useInput('', 'body')
    const imageRef = useRef(null)
    const navigate = useNavigate();

    const uploadImagePost = (e) => {
        e.preventDefault()

        setLoading(true)

        const toSend = new FormData();

        toSend.append('image', {
            name: uuidv4(),
            uri: imagePreview,
            type: 'image/jpg'
        })
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

    const updateImagePreview = () => {
        var file = imageRef.current.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (e) => {
            setImagePreview(reader.result)
        }
    }

    return (
        <>
            {loading ? 
                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                    <CircularProgress/>
                </Box>
            :
                <form onSubmit={uploadImagePost} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                    <input {...bindTitle}/>
                    <input {...bindBody}/>
                    {imagePreview && <img src={imagePreview} style={{maxWidth: '30vh', maxHeight: '30vh'}}/>}
                    <input type="file" id="image" name="image" accept="image/jpeg" onChange={updateImagePreview} ref={imageRef}/>
                    <input type="submit" value='Submit'/>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
            }
        </>
    )
}

export default CreateImagePost;