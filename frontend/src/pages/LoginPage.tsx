import {FormEvent, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import ParticlesBackground from "./ParticlesBackground";

export default function LoginPage(){
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [error, setError] = useState('')

    const auth = useAuth()
    const navigate = useNavigate();

    const handleLogin = (event : FormEvent) => {
        event.preventDefault()
        auth.login(loginUsername, loginPassword)
            .catch(e => setError(e.message))
    }

    const handleRegister = () => {
        auth.setRegister(true)
        navigate('/register')
    }


    return(
        <div>
            <ParticlesBackground/>
            <ul className={"List"}>
                <h2 className={"Greeting"}>Welcome to StockWatch</h2>
                <h3 className={"Login"}>Login</h3>
                <form  onSubmit={handleLogin}>
                    <p><input className={"Login-Input"} type="text" placeholder={'username'} value={loginUsername} onChange={ev => setLoginUsername(ev.target.value)}/></p>
                    <p><input className={"Login-Input"} type='password' placeholder={'password'} value={loginPassword} onChange={ev => setLoginPassword(ev.target.value)}/></p>
                    <button className={"Login-Button"} type={'submit'}>Login</button>
                </form>
                <button className={"Login-Button"} onClick={() => handleRegister()}>Registration</button>
                {error && <h2>{error}</h2>}
            </ul>
        </div>
    )
}