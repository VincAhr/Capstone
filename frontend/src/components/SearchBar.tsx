import React, {useEffect, useState} from "react";
import {postNewStock, searchStock} from "../service/ApiService";
import {useAuth} from "../auth/AuthProvider";
import "./SearchBar.css"

interface SearchBarProps {
    onAddStock: () => void;
}


export default function SearchBar(props: SearchBarProps) {

    const [stock, setStock] = useState("")
    const[name, setName] = useState("")
    const [symbol, setSymbol] = useState("")
    const [price, setPrice] = useState("")
    const [date, setDate] = useState("")
    const [shares, setShares] = useState("")
    const [error, setError] = useState("")
    const [error2 , setError2] = useState("")
    const {token} = useAuth()


    useEffect(() => {
        setStock("")
    }, [symbol])

    const getStock = (ev: React.FormEvent) => {
        ev.preventDefault()
            if(stock.length > 0) {
            searchStock(stock, token)
                .then(r => {
                    setName(r.name)
                    setSymbol(r.symbol)
                    setPrice(r.close)
                    setDate(r.date)
                    setStock("")
                    setError2("")
                })}
            else setError2("Search can't be empty")
        }

    const postStock = () => {
        if (symbol.length && price.length && name.length && shares.length > 0)
            postNewStock(symbol, name, price, date, shares, token)
                .then(() => {
                    setPrice('')
                    setSymbol('')
                    setDate('')
                    setShares("")
                    setError("")
                })
                .then(() => props.onAddStock())
        else setError("Not possible with empty symbol, price, date or share.")
    }

    return (
        <div className={"Searchbar-Container"}>
            <form style={{display: "inline"}} onSubmit={getStock}>
                <input className={"Input-Search"} type="text" placeholder={"name or symbol"} value={stock}
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
                <p className={"fields"}>Name: {name}</p>
                <p className={"fields"}>Symbol: {symbol}</p>
                <p className={"fields"}>Price: {price}$</p>
                <p className={"fields"}>Date: {date.split("", 10)}</p>
                <p className={"shares"}>Shares:
                <input style={{display: "inline"}} className={"Shares-Input"} type="text" placeholder={"set shares necessary"} value={shares}  onChange={ev => setShares(ev.target.value)} />
                </p>
            </p> : null}
            <h3>{error}</h3>
        </div>
    )
}