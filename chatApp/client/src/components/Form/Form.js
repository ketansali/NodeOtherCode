import React, { useState, useEffect } from "react";
import { Paper, TextField, Typography, Button } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux'
import { createPost,updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) =>{
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(currentId){
            dispatch(updatePost(currentId, postData))
        }
        else{
            dispatch(createPost(postData))
        }
        handleClear()
    } 
    const handleClear = () =>{
       setCurrentId(null)
       setPostData({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: null
    })
    }

    const handleForm = (e) =>{
        setPostData({
            ...postData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        if(post){
            setPostData(post)
        }
    }, [post])

    return (
        <>
            <Paper>
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Typography varient="h6">Creating a Memory</Typography>
                    <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={handleForm} required/>
                    <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={handleForm} required/>
                    <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={handleForm} required/>
                    <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={handleForm} required/>
                    <div className="center">
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
                        />
                    </div>
                    <Button variant="contained" color="primary" size="large" type="submit" fullWidth style={{margin: '10px 0px'}}>Submit</Button>
                    <Button variant="contained" color="primary" size="large" onClick={handleClear} fullWidth>Clear</Button>
                </form>
            </Paper>
        </>
    )
};
export default Form