import {useAuth} from "../auth/AuthProvider";
import "./Header.css"


export default function Header() {


    const {username} = useAuth()


    return (
        <div className={"Header"}>
            <h2>Welcome back {username}</h2>
        </div>
)
}