//import React from 'react'
import { useState } from 'react'
import './updateModal.scss'
import { makeRequest } from '../../axios';
import { useMutation, useQueryClient } from 'react-query';

const UpdateModal = ({setOpenUpdate, user}) => {

  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/posts/upload", formData);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (userInfo) => {
      console.log('update info');
      console.log(userInfo);
      return makeRequest.put("/users", userInfo);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['user']);
      },
    }
  );

  const handleChange = (e) => {
    setTexts((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const coverPicUrl = coverPic ? await upload(coverPic) : user.cover_pic;
    const profilePicUrl = profilePic ? await upload(profilePic) : user.profile_pic;

    mutation.mutate({...texts, coverPic:coverPicUrl, profilePic:profilePicUrl })
    setOpenUpdate(false);
    setCoverPic(null);
    setProfilePic(null);

  };

  return (
    <div className='update'>
      Update
      <form>
        <label htmlFor="profilePic">
          Profile Pic:
          <input 
            type="file"
            id='profilePic' 
            onChange={(e)=>{
              setProfilePic(e.target.files[0]);
            }}
          />
        </label>
        <label htmlFor="coverPic">
          Cover Pic: 
          <input 
            type="file" 
            id='coverPic'
            onChange={(e)=>{
              setCoverPic(e.target.files[0]);
            }}
          />
        </label>
        <input type="text" name='name' onChange={handleChange} placeholder='name' />
        <input type="text" name='city' onChange={handleChange} placeholder='city'/>
        <input type="text" name='website' onChange={handleChange} placeholder='website' />
        <button onClick={handleSubmit}>Update</button>
      </form>
      <button onClick={()=>setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default UpdateModal