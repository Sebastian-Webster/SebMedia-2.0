import React from 'react';
import { Grid } from '@mui/material';

const TextPost = ({title, body, datePosted}) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <div style={{outline: '1px solid black'}}>
                <h1>{title}</h1>
                <p>{body}</p>
            </div>
        </Grid>
    )
}

export default TextPost;