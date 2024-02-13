//import React from 'react'
import { Link } from "react-router-dom"
import "./register.scss"

const Register = () => {
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>Suicide Social.</h1>
                    <p>
                        You can do it. Fuga temporibus optio eum! Animi, odit accusamus.
                        Impedit maxime a reprehenderit deserunt officiis ad tempore ut. Dolores eligendi sint reiciendis dolor laudantium?
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>

                </div>
                <div className="right">
                    <h1>Register</h1>
                    <form action="">
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="text" placeholder="Username" />
                        <input type="text" placeholder="Name" />
                        <button>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register