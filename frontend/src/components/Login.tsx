import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {registerNewUser} from "../service/ApiService";
import "./Login.css"


export default function Login(){
    const [loginUsername, setLoginUsername] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPasswordOne, setRegisterPasswordOne] = useState('')
    const [registerPasswordTwo, setRegisterPasswordTwo] = useState('')
    const [error, setError] = useState('')


    const auth = useAuth()

    useEffect( () => {
        setRegisterPasswordTwo("")
        setRegisterPasswordOne("")
        setRegisterUsername("")
    }, [loginUsername, loginPassword])


    const handleLogin = (event : FormEvent) => {
        event.preventDefault()
        auth.login(loginUsername, loginPassword)
            .catch(e => setError(e.message))
    }

    const handleRegister = (event : FormEvent) => {
        event.preventDefault()
        setError('')
        if (!(registerPasswordOne===registerPasswordTwo)){
            setError('Passwörter nicht gleich')
        } else {
            registerNewUser({username: registerUsername, password: registerPasswordOne, passwordAgain: registerPasswordTwo})
                .catch(e => setError(e.message))
            setRegisterPasswordTwo("")
            setRegisterPasswordOne("")
            setRegisterUsername("")
        }
    }


    return(
        <div>
            <h2 className={"Greeting"}>Welcome to StockWatch</h2>
            <ul className={"List"}>
            <h3 className={"Login"}>Login</h3>
            <form  onSubmit={handleLogin}>
                <p><input className={"Login-Input"} type="text" placeholder={'username'} value={loginUsername} onChange={ev => setLoginUsername(ev.target.value)}/></p>
                <p><input className={"Login-Input"} type='password' placeholder={'password'} value={loginPassword} onChange={ev => setLoginPassword(ev.target.value)}/></p>
                <button className={"Login-Button"} type={'submit'}>Login</button>
            </form>
            <h3 className={"Register"} >Registration</h3>
            <form style={{display: "block"}} onSubmit={handleRegister}>
                <p><input className={"Register-Input"} type="text" placeholder={'username'} value={registerUsername} onChange={ev => setRegisterUsername(ev.target.value)}/></p>
                <p><input className={"Register-Input"} type='password' placeholder={'password'} value={registerPasswordOne} onChange={ev => setRegisterPasswordOne(ev.target.value)}/></p>
                <p><input className={"Register-Input"} type='password' placeholder={'password again'} value={registerPasswordTwo} onChange={ev => setRegisterPasswordTwo(ev.target.value)}/></p>
                <button className={"Register-Button"} type={'submit'}>Registration</button>
            </form>
        </ul>

            {error && <h2>{error}</h2>}
        </div>

    )
}