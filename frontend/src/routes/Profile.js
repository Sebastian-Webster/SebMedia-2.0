import React, {useContext, useState, useEffect, useMemo, Fragment} from 'react';
import { CredentialsContext } from '../context/CredentialsContext';
import useComponent from '../hooks/useComponent';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import TextPost from '../components/TextPost';
import Grid from '@mui/material/Grid'

var _ = require('lodash')

const Profile = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const { FlexRowCentreDiv, FlexColumnCentreDiv, FlexRowSpaceAroundDiv, H3NoMargin } = useComponent()
    const {name, followers, following} = storedCredentials;
    const [view, setView] = useState('textPosts')
    const [textPosts, setTextPosts] = useState(null)
    const [loadingTextPosts, setLoadingTextPosts] = useState(false)
    const [loadingTextPostsError, setLoadingTextPostsError] = useState(null)
    const [imagePosts, setImagePosts] = useState(null)
    const [loadingImagePosts, setLoadingImagePosts] = useState(false)
    const [loadingImagePostsError, setLoadingImagePostsError] = useState(null)

    const loadPosts = {
        textPosts: () => {
            if (loadingTextPosts === false) {
                setLoadingTextPosts(true)
                setLoadingTextPostsError(null)

                axios.get(`http://localhost:8080/user/textPostsByUserName/?username=${name}&skip=${Array.isArray(textPosts) ? textPosts.length : 0}`)
                .then(response => response.data.data)
                .then(result => {
                    console.log(result)
                    setTextPosts(posts => {
                        if (Array.isArray(result) && result.length > 0) {
                            const newTextPosts = Array.isArray(posts) ? _.cloneDeep(posts) : []
                            newTextPosts.push(...result)
                            return newTextPosts
                        } else return textPosts
                    })
                    setLoadingTextPosts(false)
                    setLoadingTextPostsError(null)
                })
                .catch(error => {
                    setLoadingTextPosts(false)
                    setLoadingTextPostsError(error?.response?.data?.error || String(error))
                    console.error(error)
                })
            }
        },
        imagePosts: () => {
            console.log('loading image posts')
        }
    }

    useEffect(() => {
        loadPosts.textPosts()
    }, [])

    const handleViewChange = (event, nextView) => {
        if (nextView !== view && nextView !== null) {
            setView(nextView)
            if (nextView === 'textPosts' && textPosts === null) loadPosts.textPosts()
            if (nextView === 'imagePosts' && imagePosts === null) loadPosts.imagePosts()
        }
        if (nextView === null) {
            loadPosts[view]()
            console.log(view)
        }
    }

    const DisplayTextPosts = useMemo(() => {
        return Array.isArray(textPosts) ? textPosts.map((post, index) => (
            <Fragment key={index.toString()}>
                <TextPost {...post}/>
            </Fragment>
        )) : null
    }, [textPosts])
    return (
        <>
            <FlexRowSpaceAroundDiv>
                <h1>{name}</h1>
                <FlexColumnCentreDiv>
                    <H3NoMargin>{followers.length}</H3NoMargin>
                    <H3NoMargin>Followers</H3NoMargin>
                </FlexColumnCentreDiv>
                <FlexColumnCentreDiv>
                    <H3NoMargin>{following.length}</H3NoMargin>
                    <H3NoMargin>Following</H3NoMargin>
                </FlexColumnCentreDiv>
            </FlexRowSpaceAroundDiv>
            <ToggleButtonGroup
                color="primary"
                value={view}
                exclusive
                onChange={handleViewChange}
                fullWidth
            >
                <ToggleButton value="textPosts">Text Posts</ToggleButton>
                <ToggleButton value="imagePosts">Image Posts</ToggleButton>
            </ToggleButtonGroup>
            {view === 'textPosts' ?
                <>
                    {
                        loadingTextPostsError ?
                            <h1 style={{color: 'red', textAlign: 'center'}}>{loadingTextPostsError}</h1>
                        : loadingTextPosts ?
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                                <CircularProgress/>
                            </Box>
                        : Array.isArray(textPosts) && textPosts.length === 0 ?
                            <h1 style={{textAlign: 'center'}}>{name} has no text posts.</h1>
                        :
                            <Grid container spacing={2}>
                                {DisplayTextPosts}
                            </Grid>
                    }
                </>
            : view === 'imagePosts' ?
                <>
                
                </>
            : <h1>Pretty big error occured</h1>}
        </>
    )
}

export default Profile;