import { useState, useEffect, createContext } from 'react';
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = props => {
    const [activeUser, setActiveUser] = useState({});
    const [config, setConfig] = useState({
        headers: {
            "Content-type" : "application/json",
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
    })

    useEffect(() => {
        const controlAuth = async () => {
            try {
                const { data } = await axios.get("/auth/posts", config);
                setActiveUser(data.user);
            } catch (error){
                localStorage.removeItem("authToken");
                setActiveUser({});
            }
        };
        controlAuth();
    }, []);

    return (
        <AuthContext.Provider value = {{ activeUser, setActiveUser, config, setConfig }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider; 