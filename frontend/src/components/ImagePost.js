import React, {useContext} from 'react';
import { Grid } from '@mui/material';
import { DarkModeContext } from '../context/DarkModeContext';

const ImagePost = ({title, body, datePosted, imageKey, previewImage}) => {
    const {darkMode, setDarkMode} = useContext(DarkModeContext)
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <div style={{border: `1px solid ${darkMode ? 'white' : 'black'}`}}>
                <h1>{title}</h1>
                <p>{body}</p>
                <img src={previewImage ? previewImage : `http://localhost:8080/image/${imageKey}`} style={{maxHeight: '100%', maxWidth: '100%'}}/>
            </div>
        </Grid>
    )
}

export default ImagePost;