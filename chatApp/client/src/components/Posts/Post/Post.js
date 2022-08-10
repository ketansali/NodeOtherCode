import React from "react";
import { Card, CardMedia, Typography, Button, CardContent } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";


const Post = ({ post,setCurrentId }) =>{
    const dispatch = useDispatch();
    return (
        <>
            <Card>
                <CardMedia image={post.selectedFile} title={post.title} className="media"/>
                <div className="container">
                    <Typography varient="h6">{post.creator}</Typography>
                    <Typography varient="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                <div>
                    <Button style={{color: 'black'}} size="small" onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
                <CardContent>
                    <Button size="small" color="primary" onClick={() => {}}>
                        <ThumbUpAltIcon fontSize="small" />
                        Like
                        {post.likeCount}
                    </Button>
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                </CardContent>
                <Typography varient="h5" gutterBottom>{post.message}</Typography>
            </Card>
        </>
    )
};
export default Post