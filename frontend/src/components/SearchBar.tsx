import React, {useEffect, useState} from "react";
import {postNewStock, searchStock} from "../service/ApiService";
import {useAuth} from "../auth/AuthProvider";
import "./SearchBar.css"

interface SearchBarProps {
    onAddStock: () => void;
}


export default function SearchBar(props: SearchBarProps) {

    const [stock, setStock] = useState("")
    const [symbol, setSymbol] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")
    const [shares, setShares] = useState("")
    const [error, setError] = useState("")
    const [error2 , setError2] = useState("")
    const {token} = useAuth()


    useEffect(() => {
        setStock("")
        setError("")
        setDate("")
        setShares("")
    }, [symbol])

    const getStock = (ev: React.FormEvent) => {
        ev.preventDefault()
            if(stock.length > 0) {
            searchStock(stock, token)
                .then(r => {
                    setSymbol(r.symbol)
                    setPrice(r.close)
                    setDate(r.date)
                    setError2("")
                })}
            else setError2("Search can't be empty")
        }

    const postStock = () => {
        if (symbol.length > 0 && price.length > 0)
            postNewStock(symbol, price, date, shares,token)
                .then(() => {
                    setPrice('')
                    setSymbol('')
                    setDate('')
                    setShares("")
                    setError("")
                })
                .then(() => props.onAddStock())
        else setError("Not possible with empty symbol, price or date.")
    }

    return (
        <div className={"Searchbar-Container"}>
            <form style={{display: "inline"}} onSubmit={getStock}>
                <input className={"Input-Search"} type="text" placeholder={"symbol"} value={stock}
                       onChange={ev => setStock(ev.target.value)}/>
                <button className={"button"} type="submit"> search</button>
            </form>
            {price?
            <button className={"button"} style={{display: "inline"}} type="submit" onClick={postStock}>add stock
            </button>
                : null}
            <h4>{error2}</h4>
            {price?
            <p className={"Stock-Info"}>
                <p className={"Symbol"}>Symbol: {symbol}</p>
                <p className={"Symbol"}>Price: {price}</p>
                <p className={"Symbol"}>Date: {date.split("", 10)}</p>
                <p className={"Symbol"}>Shares:
                <input style={{display: "inline"}} className={"Shares-Input"} type="text" placeholder={"Set shares"} value={shares}  onChange={ev => setShares(ev.target.value)} />
                </p>
            </p> : null}
            <h3>{error}</h3>
        </div>
    )
}