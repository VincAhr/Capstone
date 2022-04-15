import {useAuth} from "../auth/AuthProvider";


export default function Header() {


    const {username} = useAuth()


    return (
        <div className={'header'}>
            <h2>Hallo {username}</h2>
        </div>
)
}