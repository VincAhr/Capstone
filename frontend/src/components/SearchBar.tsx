import React, {useEffect, useState} from "react";
import {postNewStock, searchStock} from "../service/ApiService";
import {useAuth} from "../auth/AuthProvider";
import "./SearchBar.css"

interface SearchBarProps {
    onAddStock : () => void;
}


export default function SearchBar(props: SearchBarProps) {

    const [stock, setStock] = useState("")
    const [symbol, setSymbol] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")
    const [error, setError] = useState("")
    const {token} = useAuth()


    useEffect(() => {
        setStock("")
        setError("")
        setDate("")
    }, [symbol])

    const getStock = (ev: React.FormEvent) => {
        ev.preventDefault()
        searchStock(stock, token)
            .then(r => {
                setSymbol(r.symbol)
                setPrice(r.close)
                setDate(r.date)
            })
    }

    const postStock = () => {
        if(symbol.length>0 && price.length>0)
        postNewStock(symbol, price, date, token)
            .then(() => {
                setPrice('')
                setSymbol('')
                setDate('')
                setError("")
            })
            .then(() => props.onAddStock())
        else setError("Not available with empty symbol, price and date")
    }

    return (
        <div className={"Searchbar-Container"}>
            <form style={{display: "inline"}} onSubmit={getStock} >
                <input className={"Input-Search"} type="text" placeholder={"search"} value={stock}
                       onChange={ev => setStock(ev.target.value)}/>
                <button className={"Button-Add"}  type="submit"> search</button>
            </form>
            <button className={"Button-Add"} style={{display: "inline"}} type="submit" onClick={postStock}>add stock</button>
            <p className={"Stock-Info"}>
            <p className={"Symbol"}>Symbol: {symbol}</p> <p className={"Symbol"}>Price: {price}</p> <p className={"Symbol"}>Date: {date.split("",10)}</p>
            </p>
            <h3>{error}</h3>
            <h2 className={"DepotList-Banner"}> Depotlist</h2>
        </div>
    )
}