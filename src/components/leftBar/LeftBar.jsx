//import React from 'react'
import "./leftbar.scss"

const LeftBar = () => {
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src="" alt="" />
                        <span>John Doe</span>
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