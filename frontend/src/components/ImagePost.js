import React, {useContext, useRef, useEffect} from 'react';
import { Grid } from '@mui/material';
import { DarkModeContext } from '../context/DarkModeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const ImagePost = ({title, body, datePosted, imageKey, previewImage, liked, publicId, postId, dispatch}) => {
    const {darkMode, setDarkMode} = useContext(DarkModeContext)
    const changingLikeStatus = useRef(false)
    const NetworkRequestController = new AbortController();

    const toggleLike = () => {
        if (liked) {
            //Unlike the post
            changingLikeStatus.current = true
            axios.post('http://localhost:8080/user/unlikeImagePost', {publicId, postId}, {signal: NetworkRequestController.signal}).then(() => {
                changingLikeStatus.current = false
                dispatch({type: 'unlikePost', postId: postId})
            }).catch(error => {
                alert(error?.response?.data?.error || String(error))
                changingLikeStatus.current = false
            })
        } else {
            //Like the post
            changingLikeStatus.current = true
            axios.post('http://localhost:8080/user/likeImagePost', {publicId, postId}, {signal: NetworkRequestController.signal}).then(() => {
                changingLikeStatus.current = false
                dispatch({type: 'likePost', postId: postId})
            }).catch(error => {
                alert(error?.response?.data?.error || String(error))
                changingLikeStatus.current = false
            })
        }
    }

    useEffect(() => {
        return () => {
            //When the component gets unloaded, abort any network requests that haven't completed yet
            NetworkRequestController.abort();
        }
    }, [])

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <div style={{border: `1px solid ${darkMode ? 'white' : 'black'}`}}>
                <h1>{title}</h1>
                <p>{body}</p>
                <img src={previewImage ? previewImage : `http://localhost:8080/image/${imageKey}`} style={{maxHeight: '100%', maxWidth: '100%'}}/>
                <FontAwesomeIcon 
                    icon={liked ? fasHeart : farHeart}
                    style={{color: liked ? 'red' : darkMode ? 'white' : 'black', cursor: 'pointer', fontSize: 30}}
                    onClick={() => {
                        if (changingLikeStatus.current === false) toggleLike()
                    }}
                />
            </div>
        </Grid>
    )
}

export default ImagePost;