import {useAuth} from "../auth/AuthProvider";
import "./Header.css"


export default function Header() {


    const {username} = useAuth()


    return (
        <div className={"Header"}>
            <h2>Hallo {username}</h2>
        </div>
)
}