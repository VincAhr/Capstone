import React, {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {Stock} from "../model/StockModel";
import {deleteStock, updateStock, searchStock} from "../service/ApiService";
import "./StockItem.css";


interface  StockItemProps {
    stock: Stock
    value: number
    getAllStocks: () => void
}

export default function StockItem (props: StockItemProps) {

    const {token} = useAuth()
    const [share,setShare] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [error, setError] = useState("")
    const [price, setPrice] = useState("")
    const [newDate, setNewDate] = useState("")

    useEffect(() => {
        update(props.stock)
    }, [price]);


    const editShares = (stock: Stock) => {
        if(share.length>0){
            updateStock( {
                id: stock.id,
                symbol: stock.symbol,
                close: stock.close,
                date: stock.date,
                shares: share
            }, token)
            .then(() => props.getAllStocks())
            setShare("")
            setEditMode(false)
            setError("")
        }
        else{
            setError("Shares must be greater then 0!")
            setEditMode(false)
        }
    }

    const RefreshDataStock = () => {
            searchStock(props.stock.symbol, token)
                .then(r => {
                    setPrice(r.close)
                    setNewDate(r.date)
                })
    }

    const update = (stock : Stock) => {
        if(price.length>0 && newDate.length>0){
        updateStock({
            id: stock.id,
            symbol: stock.symbol,
            close: price.toString(),
            date: newDate.toString(),
            shares: stock.shares
        }, token).then(() => {props.getAllStocks()}
        )}
    }

    const deleteFunction = (stock: Stock) => {
        deleteStock(stock.id, token)
            .then( () => {props.getAllStocks()})
    }

    const product = (price : string, quantity : string) => {
        return (parseFloat(price) * parseFloat(quantity)).toFixed(2)
    }

    const splitDate = (date: string) => {
        return date.split("",10)
    }

    return(
        <div>
                <h4 className={"StockItem"}>
                    <p>Name:    {props.stock.symbol}</p>
                    {price.length>1
                    ?
                    <p>Price:   {price} $</p>
                    :
                    <p>Price:   {props.stock.close} $</p>}
                    <p>Date:    {splitDate(props.stock.date)}</p>
                    <p>Shares:  {props.stock.shares}</p>
                    <p>Value:   {product(props.stock.close, props.stock.shares)} $</p>
                    {editMode
                            ?
                            <div>
                                <input className={"Input-Save"} type="text" placeholder={"edit quantity"} value={share} onChange={ev => setShare(ev.target.value)}/>
                                <button className={"Button-Item"} onClick={() => editShares(props.stock)}> save </button>
                            </div>
                            :
                            <div> <button className={"Button-Item"} style={{display: "inline"}} onClick={() => setEditMode(true)} > Edit shares </button> {error} </div>
                    }
                    <button className={"Button-Item"} style={{display: "inline"}} onClick={() => deleteFunction(props.stock)} > Delete stock </button>
                    <button className={"Button-Item"} style={{display: "inline"}} onClick={() => RefreshDataStock()} > Refresh data</button>
                </h4>
        </div>
    )
}