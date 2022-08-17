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
import ImagePost from '../components/ImagePost';
import { defaultPfp } from '../constants';
import { useFilePicker } from 'use-file-picker';
import { DarkModeContext } from '../context/DarkModeContext';

var _ = require('lodash')

const Profile = () => {
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext)
    const { FlexRowCentreDiv, FlexColumnCentreDiv, FlexRowSpaceAroundDiv, H3NoMargin } = useComponent()
    const {name, followers, following, profileImageKey, _id} = storedCredentials;
    const [view, setView] = useState('textPosts')
    const [textPosts, setTextPosts] = useState(null)
    const [loadingTextPosts, setLoadingTextPosts] = useState(false)
    const [loadingTextPostsError, setLoadingTextPostsError] = useState(null)
    const [imagePosts, setImagePosts] = useState(null)
    const [loadingImagePosts, setLoadingImagePosts] = useState(false)
    const [loadingImagePostsError, setLoadingImagePostsError] = useState(null)
    const [openProfileImageFileSelector, { plainFiles: profileImageToUpload, loading: profileImageFileLoading}] = useFilePicker({accept: 'image/jpeg', multiple: false})
    const [profileImageUploading, setProfileImageUploading] = useState(false);
    const {darkMode, setDarkMode} = useContext(DarkModeContext);

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
                        } else return Array.isArray(posts) ? [...result, ...posts] : []
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
            if (loadingImagePosts === false) {
                setLoadingImagePosts(true)
                setLoadingImagePostsError(null)

                axios.get(`http://localhost:8080/user/imagePostsByUserName/?username=${name}&skip=${Array.isArray(imagePosts) ? imagePosts.length : 0}`)
                .then(response => response.data.data)
                .then(result => {
                    console.log(result)
                    setImagePosts(posts => {
                        if (Array.isArray(result) && result.length > 0) {
                            const newImagePosts = Array.isArray(posts) ? _.cloneDeep(posts) : []
                            newImagePosts.push(...result)
                            return newImagePosts
                        } else return Array.isArray(posts) ? [...result, ...posts] : []
                    })
                    setLoadingImagePosts(false)
                    setLoadingImagePostsError(null)
                }).catch(error => {
                    setLoadingImagePosts(false)
                    setLoadingImagePostsError(error?.response?.data?.error || String(error))
                    console.error(error)
                })
            }
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
            loadPosts[view]();
        }
    }

    const DisplayTextPosts = useMemo(() => {
        return Array.isArray(textPosts) ? textPosts.map((post, index) => (
            <Fragment key={index.toString()}>
                <TextPost {...post}/>
            </Fragment>
        )) : null
    }, [textPosts])

    const DisplayImagePosts = useMemo(() => {
        return Array.isArray(imagePosts) ? imagePosts.map((post, index) => (
            <Fragment key={index.toString()}>
                <ImagePost {...post}/>
            </Fragment>
        )) : null
    }, [imagePosts])

    useEffect(() => {
        console.log(profileImageToUpload[0])
        if (profileImageToUpload[0]) {
            setProfileImageUploading(true)
            const toSend = new FormData();

            toSend.append('image', profileImageToUpload[0])
            toSend.append('_id', _id)

            axios.post('http://localhost:8080/user/updateProfileImage', toSend, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => response.data.data)
            .then(result => {
                const newStoredCredentials = _.cloneDeep(storedCredentials)
                newStoredCredentials.profileImageKey = result
                if (localStorage.getItem('SebMediaCredentials')) {
                    localStorage.setItem('SebMediaCredentials', JSON.stringify(newStoredCredentials))
                }
                setStoredCredentials(newStoredCredentials)
                setProfileImageUploading(false)
            })
            .catch(error => {
                alert('Error uploading profile image: ' + (error?.response?.data?.error || String(error)))
                console.error(error)
                setProfileImageUploading(false)
            })
        }
    }, [profileImageToUpload])

    return (
        <>
            <FlexRowSpaceAroundDiv>
                <FlexRowCentreDiv>
                    <h1>{name}</h1>
                    {profileImageUploading || profileImageFileLoading ?
                        <Box sx={{display: 'flex', justifyContent: 'center', width: 40, height: 40, marginLeft: 1}}>
                            <CircularProgress/>
                        </Box>
                    :
                        <img onClick={() => openProfileImageFileSelector()} src={profileImageKey ? `http://localhost:8080/image/${profileImageKey}` : defaultPfp} style={{width: 50, height: 50, borderRadius: '100%', marginLeft: 10, cursor: 'pointer'}}/>
                    }
                </FlexRowCentreDiv>
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
                sx={{mb: 3}}
            >
                <ToggleButton value="textPosts" sx={{color: darkMode ? 'white' : 'black', borderColor: darkMode ? 'white' : 'black'}}>Text Posts</ToggleButton>
                <ToggleButton value="imagePosts" sx={{color: darkMode ? 'white' : 'black', borderColor: darkMode ? 'white' : 'black'}}>Image Posts</ToggleButton>
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
                    {
                        loadingImagePostsError ?
                            <h1 style={{color: 'red', textAlign: 'center'}}>{loadingImagePostsError}</h1>
                        : loadingImagePosts ? 
                            <Box sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
                                <CircularProgress/>
                            </Box>
                        : Array.isArray(imagePosts) && imagePosts.length === 0 ?
                            <h1 style={{textAlign: 'center'}}>{name} has no image posts.</h1>
                        :
                            <Grid container spacing={2}>
                                {DisplayImagePosts}
                            </Grid>
                    }
                </>
            : <h1>Pretty big error occured</h1>}
        </>
    )
}

export default Profile;