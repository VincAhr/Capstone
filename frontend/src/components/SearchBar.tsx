import {useEffect, useState} from "react";
import {searchStock} from "../service/ApiService";
import {Link, useNavigate} from "react-router-dom";
import {postNewStock} from "../service/ApiService";
import {useAuth} from "../auth/AuthProvider";



export default function SearchBar() {

    const [stock, setStock] = useState("")
    const [info, setInfo] = useState("")
    const [price, setPrice] = useState("")
    const {token} = useAuth()
    const navigate = useNavigate();


    useEffect(() => {
        setStock("")
    }, [info])


    const getStock = (ev : React.FormEvent) => {
        ev.preventDefault()
        searchStock(stock, token)
            .then(r => { setInfo(r.symbol);setPrice(r.close);
            })
    }

    const postStock = (ev : React.FormEvent) => {
        ev.preventDefault()
        postNewStock(info, price, token)
            .then(() => {
                setPrice('')
                setInfo('')
            })
    }


    return (
        <div className='searchbar'>
            <form onSubmit={getStock}>
                <input className='search-bar' type="text" placeholder={"search"} value={stock}
                       onChange={ev => setStock(ev.target.value)}/>
                <button className="button-search" type="submit"> search</button>
            </form>
            <form onSubmit={postStock}>
                <button className="button-add" type="submit" >add stock</button>
            </form>
            <Link to={"/DepotPage"}>
                <button className="button-depot" type={"button"}> Depot anzeigen</button>
                <button onClick={ () => { navigate("/DepotPage")}}> Depot anzeigen</button>
            </Link>
            <ul>
                <span>{info}</span><span> {price}</span>
            </ul>
        </div>
    )
}