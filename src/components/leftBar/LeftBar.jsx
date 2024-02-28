//import React from 'react'
import { useContext } from "react"
import "./leftbar.scss"
import { AuthContext } from "../../context/authContext"

const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src="" alt="" />
                        <span>{currentUser.username}</span>
                    </div>
                    <div className="item">
                        <img src="" alt="" />
                        <span>Friends</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <img src="" alt="" />
                        <span>Gaming</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                </div>
            </div>
        </div>
    )
}

export default LeftBar