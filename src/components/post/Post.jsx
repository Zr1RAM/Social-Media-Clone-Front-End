//import React from 'react'
import "./post.scss"

import FavoriteBorderoutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteoutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
    const [toggleComments, setToggleComments] = useState(false);
    const { name, profilePic, img, desc, userId } = post;
    const [coverFit, setCoverFit] = useState(true);
    const liked = false;
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userInfo">
                        <img src={profilePic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                                <span className="name">{name}</span>
                            </Link>
                            <span className="date">1 min ago</span>
                        </div>
                    </div>
                    <MoreHorizIcon />
                </div>
                <div className="content">
                    <p>{desc}</p>
                    {img &&
                        <img src={img} alt=""
                            style={{ objectFit: coverFit ? 'cover' : 'contain' }}
                            onClick={
                                () => {
                                    setCoverFit(!coverFit);
                                }
                            }
                        />}
                </div>
                <div className="info">
                    <div className="item">
                        {liked ? <FavoriteoutlinedIcon /> : <FavoriteBorderoutlinedIcon />}
                        Like
                    </div>
                    <div className="item" onClick={() => setToggleComments(!toggleComments)}>
                        <TextsmsOutlinedIcon />
                        Comment
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon />
                        Share
                    </div>
                </div>
                {toggleComments && <Comments />}
            </div>
        </div>
    )
}

export default Post