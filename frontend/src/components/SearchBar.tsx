import {useEffect, useState} from "react";
import {searchStock} from "../ApiService";
import {Link} from "react-router-dom";



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
            .then(r => setInfo(r.symbol + "   " + r.close))
    }


    return (
        <div className='searchbar'>
            <form onSubmit={getStock}>
                <input className='search-bar' type="text" placeholder={"search"} value={stock}
                       onChange={ev => setStock(ev.target.value)}/>
                <button className="button-search" type="submit"> search</button>
            </form>
            <button className="button-add" type="button" >add stock</button>
            <Link to={"/DepotPage"}>
                <button className="button-depot" type={"button"}> Depot anzeigen</button>
            </Link>

            <ul>
                <span>{info}</span> <span>{price}</span>
            </ul>
        </div>
    )
}