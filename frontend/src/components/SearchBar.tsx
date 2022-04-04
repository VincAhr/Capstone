import {useEffect, useState} from "react";
import {searchStock} from "../service/ApiService";
import {Link} from "react-router-dom";
import {postNewStock} from "../service/ApiService";



export default function SearchBar() {

    const [stock, setStock] = useState("")
    const [info, setInfo] = useState("")
    const [price, setPrice] = useState("")


    useEffect(() => {
        setStock("")
    }, [info])


    const getStock = (ev : React.FormEvent) => {
        ev.preventDefault()
        searchStock(stock)
            .then(r => { setInfo(r.symbol);setPrice(r.close);
            })
    }

    const postStock = (ev : React.FormEvent) => {
        ev.preventDefault()
        postNewStock(info, price)
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
            </Link>
            <ul>
                <span>{info}</span><span> {price}</span>
            </ul>
        </div>
    )
}