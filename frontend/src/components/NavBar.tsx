import {useNavigate} from "react-router-dom";
import {useAuth} from "../auth/AuthProvider";

export default function NavBar(){
    const nav = useNavigate()
    const auth = useAuth()


    return(
        <div className={'navBar'}>
            <button onClick={()=> nav('/login')}>Refresh Page</button>
            <button onClick={auth.logout}> Logout </button>
        </div>
    )
}