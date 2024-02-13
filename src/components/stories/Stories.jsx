//import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './stories.scss'

const Stories = () => {

    const { currentUser } = useContext(AuthContext);

    // temporary
    const stories = [
        {
            id: 1,
            name: "LeanbeefPatty",
            img: "https://image-cdn.essentiallysports.com/wp-content/uploads/leanbeefpatty_1701086644562.jpeg?width=720",
        },
        {
            id: 2,
            name: "Faith Ordway",
            img: "https://i.pinimg.com/736x/88/69/51/8869514b13157732de9328d8f8306aab.jpg",
        },
        {
            id: 3,
            name: "Keiani",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4N6pbvFWwTsMQ1JPAGB0t_ZVdDFl8KsW-9w&usqp=CAU",
        },
        {
            id: 4,
            name: "mdjfitness",
            img: "https://preview.redd.it/shes-officially-my-bec-whats-with-the-pants-down-smh-v0-7qwplpkjrkfa1.jpg?auto=webp&s=6a76d71c7d594cc70864d480ac55c4fbbc58de22",
        },
        {
            id: 5,
            name: "summer fun fitness",
            img: "https://summerfunfitness.com/wp-content/uploads/2023/09/summerfunfitness-e1694715138894.jpg",
        },
        {
            id: 6,
            name: "maranda luna",
            img: "https://i.ytimg.com/vi/hms-mikzdIY/maxresdefault.jpg",
        }
    ];
    return (
        <div className='stories'>
            <div className="story" key={currentUser.id}>
                <img src={currentUser.profilePic} alt="" />
                <span>{currentUser.name}</span>
                <button>+</button>
            </div>
            {stories.map((story) => {
                return (
                    <div className="story" key={story.id}>
                        <img src={story.img} alt="" />
                        <span>{story.name}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Stories;