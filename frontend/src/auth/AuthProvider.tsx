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
        if (token){
            const tokenDetails = JSON.parse(window.atob(token.split('.')[1]));
            setUsername(tokenDetails.sub);
            nav("/home")
        } else if (!register && !token) {
            nav("/login")
        } else if (register && !token) {
            nav("/register")
        }
    }, [token, nav, register])

    const login = (username: string, password : string) => {
        return loginUser({username:username, password:password})
            .then(data => setToken(data.token))
            .then(() => nav("/home"))
    }

    const logout = () => {
        setToken('')
        nav("/login")
    }

    return <AuthContext.Provider value={{token, username, login, logout, setRegister}}>
        {register ? children : < LoginPage/>} </AuthContext.Provider>;
   // {register ? children : < LoginPage/>}
}

export const useAuth = () => useContext(AuthContext)