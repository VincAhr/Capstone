import React, {useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {StockItem} from "../model/StockModel";


export default function StockList () {

    const {token} = useAuth()
    const [error, setError] = useState("")
    const [stocks, setStocks] = useState([] as Array<StockItem>)


    const getAllStocks = (token: string) => {

        return fetch('api/stock', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },})
            .then(response => response.json())
            .then(response => setStocks(response))
            .catch(e => setError(e.message))
    }


    return(
        <div>
            <h2>Depotlist</h2>
            <button onClick={() => getAllStocks(token)}> refresh list </button>
            <ul>
                <h1>{error}</h1>
                <h3>
                    {stocks.map(stocks =>
                        <div>Name: {stocks.symbol} price: {stocks.close} date:____ quantity:___</div>)}
                </h3>
            </ul>
        </div>
    )
}