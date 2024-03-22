import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const login = async (inputs) => {
        // temp
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true,
        });
        console.log(res.status == 200 ? 'login successful' : 'login failed');
        const { id, username, name, profile_pic } = await res.data;
        setCurrentUser({ id, name, username, profilePic: profile_pic });
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>
            {children}
        </AuthContext.Provider>
    );
}