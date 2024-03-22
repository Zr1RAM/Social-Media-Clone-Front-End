//import React from 'react'
import { useContext, useState } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import moment from "moment";
// const exampleComments = [
//     {
//         id: 1,
//         desc: "some comment goes here",
//         name: "Jane Doe",
//         userId: 1,
//         profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqMlGCgTelw0SyA7C01VdmfL7Hrraz93jQw&usqp=CAU"
//     },
//     {
//         id: 2,
//         desc: "too lazy to make comments for each post",
//         name: "John Doe",
//         userId: 2,
//         profilePic: "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905"
//     }
// ];

const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => makeRequest.get('/comments?postId=' + postId).then((res) => {
            //console.log(res.data);
            return res.data
        }),
      });

    //console.log(data);
    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            //console.log(newComment);
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                //Invalidate and refetch
                queryClient.invalidateQueries(["comments", postId]);
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const [commentDesc, setCommentDesc] = useState("");

    const handleClick = (e) => {
        e.preventDefault();
        
        if(commentDesc !== "") {
            mutation.mutate({ desc: commentDesc, postId });
        }
        setCommentDesc("");
    };

    return (
        <div className='comments'>
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input 
                    type="text" 
                    placeholder='Write a comment' 
                    onChange={(e) => {
                            setCommentDesc(e.target.value)
                        }
                    }
                    value={commentDesc}
                />
                <button onClick={handleClick}>Post</button>
            </div>
            {error ? <ErrorComment /> : isLoading ? <LoadingComments /> : data.map((comment) => {
                const { id, desc, name, userId, profile_pic: profilePic, created_at } = comment;
                return (
                    <div className="comment" key={id}>
                        <img src={profilePic} alt="" />
                        <div className="info">
                            <span>{name}</span>
                            <p className='user-comment'>{desc}</p>
                        </div>
                        <span className='date'>{moment(created_at).fromNow()}</span>
                    </div>
                );
            })}
        </div>
    )
}

const ErrorComment = () => {
    return (
        <span style={{color: 'red'}}>{`unable to load comments.. ${error}`}</span>
    );
}

const LoadingComments = () => {
    return (
        <span>loading...</span>
    );
}

export default Comments