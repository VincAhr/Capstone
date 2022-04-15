import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {registerNewUser} from "../service/ApiService";


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
        <div className={'loginForm'}>
            <ul>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <input style={{display: "block"}} type="text" placeholder={'username'} value={loginUsername} onChange={ev => setLoginUsername(ev.target.value)}/>
                <input type='password' placeholder={'password'} value={loginPassword} onChange={ev => setLoginPassword(ev.target.value)}/>
                <button type={'submit'}>login</button>
            </form>
            <h3>Registration</h3>
            <form onSubmit={handleRegister}>
                <input style={{display: "block"}} type="text" placeholder={'username'} value={registerUsername} onChange={ev => setRegisterUsername(ev.target.value)}/>
                <input type='password' placeholder={'password'} value={registerPasswordOne} onChange={ev => setRegisterPasswordOne(ev.target.value)}/>
                <input type='password' placeholder={'password again'} value={registerPasswordTwo} onChange={ev => setRegisterPasswordTwo(ev.target.value)}/>
                <button type={'submit'}>registration</button>
            </form>
        </ul>
            {error && <h2>{error}</h2>}
        </div>
    )
}