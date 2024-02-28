//import React from 'react'
import { Link } from "react-router-dom"
import "./register.scss"
import { useState } from "react"
import axios from "axios";

const Register = () => {

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        name: "",
        password: "",
    });

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (!isValidEmail(inputs.email)) {
            setErr("Invalid email address");
            return;
        }
        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs);
        } catch (error) {
            console.log(error.response.data);
            setErr(error.response.data);
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

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
                        <input type="text" placeholder="Name" name="name" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                        <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                        <input type="password" placeholder="Password" name="password" onChange={handleChange} />
                        {err && <span style={{ color: 'red' }} >{err}</span>}
                        <button onClick={handleClick}>Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register