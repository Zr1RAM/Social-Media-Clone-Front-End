//import React from 'react'
import { useContext, useState } from "react";
import "./share.scss"
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient, } from 'react-query'
import { makeRequest } from "../../axios";
import { getProfileImgUrl } from "../../../utilities/util";

const Share = () => {

    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const queryClient = useQueryClient();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/posts/upload", formData);
            return res.data;
        } catch (error) {
            console.log(error)
        }
    }

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts", newPost);
        },
        {
            onSuccess: () => {
                //Invalidate and refetch
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        //console.log({desc, file})
        let imgUrl = "";
        if(file) {
            imgUrl = await upload();
            //console.log(imgUrl);
        }
        if(desc !== "" || file !== null) {
            //console.log(`is this calling? ${imgUrl}`);
            //console.log({desc, img: imgUrl});
            mutation.mutate({desc, img: imgUrl});
        }
        setDesc("");
        setFile(null);
    }

  const {currentUser} = useContext(AuthContext);
  return (
    <div className="share">
        <div className="container">
        <div className="top">
            <div className="left">
                <img src={getProfileImgUrl(currentUser.profilePic, currentUser.id)} alt="" />
                <input 
                    type="text" 
                    placeholder={`What's on your mind ${currentUser.name}?`} 
                    onChange={(e)=>{setDesc(e.target.value)}}
                    value={desc}
                />
            </div>
            <div className="right">
                {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
            </div>
        </div>
        <hr/>
        <div className="bottom">
            <div className="left">
                <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e)=>{
                        setFile(e.target.files[0]);
                    }}
                />
                <label htmlFor="file">
                    <div className="item" onClick={()=>{}}>
                        <img 
                            src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/img.png" 
                            alt=""
                        />
                        <span>Add Image</span>
                    </div>
                </label>
                <div className="item" onClick={()=>{}}>
                    <img 
                        src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/map.png" 
                        alt="" 
                    />
                    <span>Add Place</span>
                </div>
                <div className="item" onClick={()=>{}}>
                    <img
                        src="https://raw.githubusercontent.com/safak/youtube2022/social-app/client/src/assets/friend.png" 
                        alt="" 
                    />
                    <span>Tag Friends</span>
                </div>
            </div>
            <div className="right">
                <button onClick={handleClick}>Share</button>
            </div>
        </div>
    </div>
    </div>
    
  )
}

export default Share;