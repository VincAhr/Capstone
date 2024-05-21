import {FormEvent, useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {registerNewUser} from "../service/ApiService";
import "./Register.css"


export default function RegisterPage(){

    const [registerUsername, setRegisterUsername] = useState('')
    const [registerPasswordOne, setRegisterPasswordOne] = useState('')
    const [registerPasswordTwo, setRegisterPasswordTwo] = useState('')
    const [error, setError] = useState('')

    const auth = useAuth()

    useEffect( () => {
        setRegisterPasswordTwo("")
        setRegisterPasswordOne("")
        setRegisterUsername("")
    }, [])


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
            auth.setRegister(false)
        }
    }


    return(
        <div>
            <ul className={"list"}>
                <h2 className={"greeting"}>Welcome to StockWatch</h2>
                <h3 className={"register"} >Registration</h3>
                <form onSubmit={handleRegister}>
                    <p><input className={"register-input"} type="text" placeholder={'username'} value={registerUsername} onChange={ev => setRegisterUsername(ev.target.value)}/></p>
                    <p><input className={"register-input"} type='password' placeholder={'password'} value={registerPasswordOne} onChange={ev => setRegisterPasswordOne(ev.target.value)}/></p>
                    <p><input className={"register-input"} type='password' placeholder={'password again'} value={registerPasswordTwo} onChange={ev => setRegisterPasswordTwo(ev.target.value)}/></p>
                    <button className={"register-button"} type={'submit'}>Registration</button>
                </form>
            </ul>

            {error && <h2>{error}</h2>}
        </div>

    )
}