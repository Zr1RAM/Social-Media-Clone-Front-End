//import React from 'react'
import "./profile.scss"

import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailoutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import UpdateModal from "../../components/modal/UpdateModal";
import { getProfileImgUrl } from "../../../utilities/util";

//temp
const hadesPosts = [
    {
        id: 1,
        name: "Hades",
        userId: 1,
        profilePic: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/2800/Hades.Hercules.webp",
        desc: "Hercules. Why does that name ring a bell?",
    },
    {
        id: 2,
        name: "Hades",
        userId: 1,
        profilePic: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/2800/Hades.Hercules.webp",
        desc: "Uh, guys? Olympus would be that way",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJg8BAcq-5lujqbn7TeLc8XIasUIQIdOjZpeBGeg-RGYMj7HcbaBbzFN6S43F4psi3cRs&usqp=CAU"
    },
    {
        id: 3,
        name: "Hades",
        userId: 1,
        profilePic: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/2800/Hades.Hercules.webp",
        desc: "Bling Bang Bang Bling Bang Bang Bling Bang Bang Born.. Damn it can't get that song out of my head",
    },
    {
        id: 4,
        name: "Hades",
        userId: 1,
        profilePic: "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/2800/Hades.Hercules.webp",
        desc: "Whoa. Is my hair out?",
        img: "https://i.pinimg.com/originals/8e/02/37/8e0237dac24921ed2ffd7c9febd955ec.png"
    },
];

const Profile = () => {

    const [openUpdate, setOpenUpdate] = useState(false);

    const userId = useLocation().pathname.split("/")[2];
    const { currentUser } = useContext(AuthContext);
    //console.log(userId);

    const { isLoading, error, data } = useQuery({
        queryKey: ['user'],
        queryFn: () => makeRequest.get('/users/find/' + userId).then((res) => {
            return res.data;
        }),
      });

      console.log('user profile data: ');
      console.log(data);
      const handleRelationshipStatus = () => {
            if(currentUser.id == userId) {
                console.log("open modal");
                setOpenUpdate(true);
            }
      }

    return (
        <div className="profile">
            {error ? (
                <div style={{color: 'red'}}>{error}</div>
            ) : isLoading ? (
                <div><span>loading...</span></div>
            ) : ( <>
            <div className="images">
                <img
                    src={getProfileImgUrl(data?.cover_pic, data.id)}
                    alt=""
                    className="cover"
                />
                <img
                    // src={data?.profile_pic}
                    src={getProfileImgUrl(data?.profile_pic, data.id)}
                    alt=""
                    className="profilePic"
                />
            </div>
            <div className="profileContainer">
                <div className="userInfo">
                    <div className="left">
                        <a href="http://facebook.com">
                            <FacebookTwoToneIcon fontSize="large" />
                        </a>
                        <a href="http://instagram.com">
                            <InstagramIcon fontSize="large" />
                        </a>
                        <a href="http://twitter.com">
                            <TwitterIcon fontSize="large" />
                        </a>
                        <a href="http://linkedin.com">
                            <LinkedInIcon fontSize="large" />
                        </a>
                        <a href="http://pinterest.com">
                            <PinterestIcon fontSize="large" />
                        </a>
                    </div>
                    <div className="center">
                        <span>{data?.name}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon />
                                <span>{data?.city}</span>
                            </div>
                            <div className="item">
                                <LanguageIcon />
                                <span>
                                    <a
                                        href="https://64.media.tumblr.com/a5f1b73d1f74b0b57821a8cd637a7cc7/4f8d7bb98e539b31-dc/s1280x1920/07a87d82ba20e810a516d63b7f7b824b63a740e7.gifv"
                                    >
                                        {data?.website}
                                    </a>
                                </span>
                            </div>
                        </div>
                        <button onClick={handleRelationshipStatus}>
                            { currentUser.id == userId ? 
                                "Update" : 
                                data?.relationship_status !== null ? 
                                "Unfollow" : "Follow"}
                        </button>
                    </div>
                    <div className="right">
                        <EmailoutlinedIcon />
                        <MoreVertIcon />
                    </div>
                </div>
            </div>
            {data.posts &&
                <div className="userPosts">
                    <Posts posts={data?.posts} />
                </div>
            }
            </>)}
            {openUpdate && <UpdateModal setOpenUpdate = {setOpenUpdate} user={data}/>}
        </div>
    )
}

export default Profile