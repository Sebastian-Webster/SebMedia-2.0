import React, {useContext} from 'react';
import { Grid } from '@mui/material';
import { DarkModeContext } from '../context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

const TextPost = ({title, body, datePosted, liked}) => {
    const {darkMode, setDarkMode} = useContext(DarkModeContext);
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <div style={{border: `1px solid ${darkMode ? 'white' : 'black'}`, padding: 10}}>
                <h1>{title}</h1>
                <p>{body}</p>
                <FontAwesomeIcon icon={liked ? fasHeart : farHeart} style={{backgroundColor: liked ? 'red' : 'transparent', cursor: 'pointer', fontSize: 30}}/>
            </div>
        </Grid>
    )
}

export default TextPost;