//import React from 'react'
import { useQuery } from 'react-query';
import Post from '../post/Post';
import './posts.scss'
import { makeRequest } from '../../axios';
import { memo } from 'react';

//temp
const examplePosts = [
    {
        id: 5,
        name: "summer fun fitness",
        userId: 5,
        profilePic: "https://summerfunfitness.com/wp-content/uploads/2022/12/best-female-calisthenics-athlete-summerfunfitness-flexing.png",
        desc: "3 Day Calisthenics Workout Plan | Full program",
        img: "https://summerfunfitness.com/wp-content/uploads/2022/03/calisthenics-girl-3-day-workout-routine-at-home-youtube-thumbnail.png"
    },
    {
        id: 84,
        name: "Depresso",
        userId: 84,
        profilePic: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/palworld/8/80/T_NegativeKoala_icon_normal.png",
        desc: "Existence is pain. Legalize euthansia administration",
    },
    {
        id: 85,
        name: "Relaxasurus",
        userId: 85,
        profilePic: "https://palworld.wiki.gg/images/6/6f/Relaxaurus_icon.png",
        desc: "My brother got a new mohawk hairdo. DUHUHUHUUUH",
        img: "https://img6.fresherslive.com/latestnews/2024/01/how-to-find-65b0e4c5eb8254371077-1200.webp"
    },
    {
        id: 86,
        name: "Relaxasurus",
        userId: 85,
        profilePic: "https://palworld.wiki.gg/images/6/6f/Relaxaurus_icon.png",
        desc: "I'm not offended by all the dumb blonde jokes because I know I'm not dumb... and I also know that I'm not blonde. #qutoeoftheday #HUUHUUUH",
        img: "https://static1.srcdn.com/wordpress/wp-content/uploads/2024/02/relaxaurus-from-palworld.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"
    },
    {
        id: 2,
        name: "Faith Ordway",
        userId: 2,
        profilePic: "https://i.redd.it/jzj9iib5q8ob1.jpg",
        desc: "Congratulations, you all did it. I no longer like running up that hill by Kate Bush. I hope you’re happy.",
    },
    {
        id: 1,
        name: "LeanbeefPatty",
        userId: 1,
        profilePic: "https://i.pinimg.com/originals/d8/7b/24/d87b24ebff13b91f74c3b9ab6579e13d.jpg",
        desc: "Every day I fight the urge to become a forest hermit. My soul yearns for hermithood",
        img: "https://pbs.twimg.com/media/GAtccGvacAALSpO?format=jpg&name=large",
    },
    {
        id: 71,
        name: "LeanbeefPatty",
        userId: 1,
        profilePic: "https://i.pinimg.com/originals/d8/7b/24/d87b24ebff13b91f74c3b9ab6579e13d.jpg",
        desc: "Every day I fight the urge to become a forest hermit. My soul yearns for hermithood",
        img: "https://pbs.twimg.com/media/GAtccGvacAALSpO?format=jpg&name=large",
    },
    {
        id: 55,
        name: "summer fun fitness",
        userId: 5,
        profilePic: "https://summerfunfitness.com/wp-content/uploads/2022/12/best-female-calisthenics-athlete-summerfunfitness-flexing.png",
        desc: "3 Day Calisthenics Workout Plan | Full program",
        img: "https://summerfunfitness.com/wp-content/uploads/2022/03/calisthenics-girl-3-day-workout-routine-at-home-youtube-thumbnail.png"
    },
    {
        id: 484,
        name: "Depresso",
        userId: 84,
        profilePic: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/palworld/8/80/T_NegativeKoala_icon_normal.png",
        desc: "Existence is pain. Legalize euthansia administration",
    },
    {
        id: 31,
        name: "LeanbeefPatty",
        userId: 1,
        profilePic: "https://i.pinimg.com/originals/d8/7b/24/d87b24ebff13b91f74c3b9ab6579e13d.jpg",
        desc: "Every day I fight the urge to become a forest hermit. My soul yearns for hermithood",
        img: "https://pbs.twimg.com/media/GAtccGvacAALSpO?format=jpg&name=large",

    },
];

const Posts = ({ posts }) => {

    console.log(posts);
    const { isLoading, error, data } = useQuery({
        queryKey: ['posts'],
        queryFn: () => {
            if(!posts) {
                console.log('should fetch posts');
                return makeRequest.get('/posts').then((res) => {
                    console.log(res.data);
                    //posts = res.data;
                    return res.data;
                })
            } else {
                console.log("post data from props");
                return posts;
            }
        },
      });
      console.log(data);

    return (
        <div className='posts'>
            {/* {posts.map((post) => {
                return <Post key={post.id} post={post} />
            })} */}
            {error ? <span style={{color: 'red'}}>{`something went wrong.. ${error}`}</span> : isLoading ? <span>loading...</span> : data?.map((post) => {
                return <Post key={post.id} post={post}/>
            })}
        </div>
    )
}

export default Posts;