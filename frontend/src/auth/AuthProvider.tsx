import {ReactNode, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {loginUser} from "../service/ApiService";
import {useNavigate} from "react-router-dom";

export default function AuthProvider({children}:{children :ReactNode}) {

    const [token , setToken] = useState('')
    const [username, setUsername] = useState("");
    const nav = useNavigate()

    useEffect(()=>{
        if (token){
            const tokenDetails = JSON.parse(window.atob(token.split('.')[1]));
            setUsername(tokenDetails.sub);
            nav("/")
        } else {
            nav("/login")
        }
    }, [token, nav])

    const login = (username: string, password : string) => {
        return loginUser({username:username, password:password})
            .then(data => setToken(data.token))
    }

    const logout = () => {
        setToken('')
    }

    return <AuthContext.Provider value={{token, username, login, logout}} >{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext)