//import React from 'react'
import { useState } from 'react'
import './updateModal.scss'

const UpdateModal = ({setOpenUpdate}) => {

  const [texts, setTexts] = useState({
    name: "",
    city: "",
    website: "",
  });

  const handleChange = (e) => {
    setTexts((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div className='update'>
      Update
      <form>
        <input type="file" />
        <input type="file" />
        <input type="text" name='name' onChange={handleChange} />
        <input type="text" name='city' onChange={handleChange} />
        <input type="text" name='website' onChange={handleChange} />
        <button onClick={handleClick}>Update</button>
      </form>
      <button onClick={()=>setOpenUpdate(false)}>X</button>
    </div>
  )
}

export default UpdateModal