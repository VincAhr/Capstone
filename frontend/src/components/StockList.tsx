import React, {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {StockItem} from "../model/StockModel";
import {deleteStock, getAllStocks, postShares,} from "../service/ApiService";



export default function StockList () {

    const {token} = useAuth()
    const [error, setError] = useState("")
    const [stocks, setStocks] = useState([] as Array<StockItem>)
    const [editShare,setEditShare] = useState("")
    const [totalValue, setTotalValue] = useState([] as Array<string>)
    const [editMode, setEditMode] = useState(false)




    useEffect(() => {
        getAllStocks(token)
            .then(response => setStocks(response))
            .catch(e => setError(e.message))
        total()
    }, [editMode, token,])

    const deleteFunction = (stock : StockItem) => {
        deleteStock(stock.id, token)
            .then( () => {
            getAllStocks(token)
                .then(response => setStocks(response))
                .catch(e => setError(e.message))})
    }

    const editShares = (stock: StockItem) => {
        postShares( {
            id: stock.id,
            symbol: stock.symbol,
            close: stock.close,
            date: stock.date,
            shares:editShare
        }, token)
            .then(()=> {
            getAllStocks(token)
                .then(response => setStocks(response))
        setEditShare('')
        setEditMode(false)})
    }

    const product = (price : string, anzahl : string) => {

        let value = parseInt(price) * parseInt(anzahl)
        if(value>0) {
            return value}
        else return 0
    }

    const total = () => {
        let sum = stocks.map((stocks  => (stocks.close, stocks.shares)))
    }

    const splitDate = (date: string) => {
        let data = date.split("",10)
        return data
    }



    return(
        <div>
            <h2
                style={{backgroundColor: "grey"}}> Depotlist
                 total value: {total} {totalValue}
            </h2>
                <h2>{error}</h2>
                <h4>
                    {stocks.map(stocks =>
                        <div>
                            <p>name :   {stocks.symbol}</p>
                            <p>price :  {stocks.close} $</p>
                            <p>date :   {splitDate(stocks.date)}</p>
                            <p>shares : {stocks.shares}</p>
                            <p>value :  {product(stocks.close, stocks.shares)} $ </p>

                            {
                                editMode
                                    ?
                                    <div>
                                    <input className='edit-bar' type="text" placeholder={"edit quantitiy"} value={editShare} onChange={ev => setEditShare(ev.target.value)}/><button className="button-list" onClick={() => editShares(stocks)}> save </button>
                                    </div>
                                    :
                                    <div>
                                    <button className="button-list" onClick={() => setEditMode(true)} > edit quantity </button>
                                    </div>
                            }
                            <button className="button-list" onClick={() => deleteFunction(stocks)}> delete stock </button>
                        </div>)}
                </h4>
        </div>
    )
}