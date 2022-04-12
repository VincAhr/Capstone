import {useEffect, useState} from "react";
import {searchStock} from "../service/ApiService";
import {postNewStock} from "../service/ApiService";
import {useAuth} from "../auth/AuthProvider";


export default function SearchBar() {

    const [stock, setStock] = useState("")
    const [info, setInfo] = useState("")
    const [price, setPrice] = useState("")
    const {token} = useAuth()


    useEffect(() => {
        setStock("")
    }, [info])

    const getStock = (ev: React.FormEvent) => {
        ev.preventDefault()
        searchStock(stock, token)
            .then(r => {
                setInfo(r.symbol);
                setPrice(r.close);
            })
    }

    const postStock = (ev: React.FormEvent) => {
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
            <ul>
            <form onSubmit={postStock}>
                <button className="button-add" type="submit">add stock</button>
            </form>
            </ul>
            <ul>
                <span>{info}</span> <span>{price}</span>
            </ul>
        </div>
    )
}