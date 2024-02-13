//import React from 'react'
import { useContext } from 'react';
import './comments.scss';
import { AuthContext } from '../../context/authContext';

const exampleComments = [
    {
        id: 1,
        desc: "some comment goes here",
        name: "Jane Doe",
        userId: 1,
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHqMlGCgTelw0SyA7C01VdmfL7Hrraz93jQw&usqp=CAU"
    },
    {
        id: 2,
        desc: "too lazy to make comments for each post",
        name: "John Doe",
        userId: 2,
        profilePic: "https://dudeproducts.com/cdn/shop/articles/gigachad_1068x.jpg?v=1667928905"
    }
];

const Comments = ({ comments = exampleComments }) => {
    const { currentUser } = useContext(AuthContext);

    //temp


    return (
        <div className='comments'>
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" placeholder='Write a comment' />
                <button>Post</button>
            </div>
            {comments.map((comment) => {
                const { id, desc, name, userId, profilePic } = comment;
                return (
                    <div className="comment" key={id}>
                        <img src={profilePic} alt="" />
                        <div className="info">
                            <span>{name}</span>
                            <p className='user-comment'>{desc}</p>
                        </div>
                        <span className='date'>1 hour ago</span>
                    </div>
                );
            })}
        </div>
    )
}

export default Comments