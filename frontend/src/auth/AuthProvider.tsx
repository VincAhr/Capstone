import {ReactNode, useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {loginUser} from "../service/ApiService";
import {useNavigate} from "react-router-dom";
import LoginPage from "../pages/LoginPage";

export default function AuthProvider({children}:{children :ReactNode}) {

    const [token , setToken] = useState('')
    const [username, setUsername] = useState("");
    const [register, setRegister] = useState(false)
    const nav = useNavigate()

    useEffect(()=>{
        if (token) {
            setUsername(JSON.parse(window.atob(token.split('.')[1])).sub)
            nav("/home")
        } else if (register && !token) {
            nav("/register")
        }
        else {
            nav("/login")
        }
    }, [token, nav, register])

    const login = (username: string, password : string) => {
        return loginUser({username:username, password:password})
            .then(data => setToken(data.token))
    }

    const logout = () => {
        setToken('')
        nav("/login")
    }

    return <AuthContext.Provider value={{token, username, login, logout, setRegister}}>
        {register ? children : < LoginPage/>} </AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext)