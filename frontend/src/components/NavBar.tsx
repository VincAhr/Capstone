import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";
import "./NavBar.css"

export default function NavBar(){
    const nav = useNavigate()
    const auth = useAuth()


    return(
        <div className={'NavBar-Container'}>
            <button className={"NavBar-Button"} onClick={()=> nav('/home')}>Refresh Page</button>
            <button className={"NavBar-Button"}  onClick={auth.logout}> Logout </button>
        </div>
    )
}