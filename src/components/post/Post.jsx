//import React from 'react'
import "./post.scss"

import FavoriteBorderoutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteoutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Link } from "react-router-dom";
import { memo, useContext, useEffect, useState } from "react";
import Comments from "../comments/Comments";
import moment from "moment";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { getProfileImgUrl } from "../../../utilities/util";

const baseURL = 'http://localhost:8800/uploads/';

const Post = ({ post }) => {
    const { currentUser } = useContext(AuthContext);
    const [toggleComments, setToggleComments] = useState(false);
    const { name, profile_pic: profilePic, img, desc, userid, created_at, id, comment_count, liked_users } = post;
    //console.log(userid);
    const [isCoverFit, setIsCoverFit] = useState(true); 

    const [imageSrc, setImageSrc] = useState("");

    const [liked, setLiked] = useState(false); 

    const [togglePostOptions, setTogglePostOptions] = useState(false);

    const queryClient = useQueryClient();

    // let likeCount = 0, commentCount = 0;

    // const { isLoading, error, data } = useQuery({
    //     queryKey: ['post', id],
    //     queryFn: () => makeRequest.get('/posts/' + id).then((res) => {
    //         console.log(res.data);
    //         return res.data;
    //     }),
    //   });

    const mutation = useMutation(
        () => {
            if(liked) {
                //console.log('executing unlike');
                // likeCount -= 1;
                return makeRequest.delete("/likes?postId=" + id);
            } else {
                //console.log("executing like");
                // likeCount += 1;
                return makeRequest.post("/likes", {postId: id});
            }
        },
        {
            onSuccess: () => {
                
                //queryClient.invalidateQueries(['posts']);
                //queryClient.invalidateQueries(['post', id]);
            },
        }
    );

    const deleteMutation = useMutation(
        (postId) => {
            return makeRequest.delete("/posts/" + postId);
        },
        {
            onSuccess: () => {
                
                queryClient.invalidateQueries(['posts']);
                //queryClient.invalidateQueries(['post', id]);
            },
        }
    );

    const handleLikes = () => {
        mutation.mutate();
        setLiked(!liked);
    }

    

    useEffect(() => {
        // const fetchImage = async () => {
        //     try {
        //         const response = await fetch(baseURL + img);
        //         const blob = await response.blob();
        //         const url = URL.createObjectURL(blob);
        //         setImageSrc(url);
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
        // likeCount = liked_users.length;
        
        if(liked_users?.includes(currentUser.id)) {
            setLiked(true);
        } 
        // else {
        //     setLiked(false);
        // }
        
        

        if(img != null && !img.includes('https://')) {
            //fetchImage();
            setImageSrc(baseURL + img)
        } else {
            setImageSrc(img);
        }

        //console.log(imageSrc);

        
        

    }, []);

    const handleDelete = () => {
        deleteMutation.mutate(id);
    }
    
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={getProfileImgUrl(profilePic, userid)} alt="" />
                        <div className="details">
                            <Link to={`/profile/${userid}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{name}</span>
                            </Link>
                            <span className="date">{moment(created_at).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={() => setTogglePostOptions(!togglePostOptions)}/>
                    {
                        togglePostOptions &&
                        (userid == currentUser.id ? (
                            <button onClick={handleDelete}>delete</button>
                        ) : (
                            "Options pending"
                        ))
                    }
                </div>
                <div className="content">
                    <p>{desc}</p>
                    {imageSrc !== null &&
                        <img src={imageSrc} alt=""
                            style={{ objectFit: isCoverFit ? 'cover' : 'contain' }}
                            onClick={
                                () => {
                                    setIsCoverFit(!isCoverFit);
                                }
                            }
                        />}
                </div>
                <div className="info">
                    <div className="item" onClick={handleLikes}>
                        {liked ? <FavoriteoutlinedIcon style={{color: 'red'}}/> : <FavoriteBorderoutlinedIcon />}
                        {/* { likeCount + " Likes"} */}
                        { (liked_users? liked_users.length : "0") + " Likes"}
                    </div>
                    <div className="item" onClick={() => setToggleComments(!toggleComments)}>
                        <TextsmsOutlinedIcon />
                        { comment_count + " Comments"}
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {toggleComments && <Comments postId={id}/>}
            </div>
        </div>
    )
}

export default memo(Post);