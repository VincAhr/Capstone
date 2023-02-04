import React, {useEffect, useState} from "react";
import {useAuth} from "../auth/AuthProvider";
import {Stock} from "../model/StockModel";
import {deleteStock, updateStock, searchStock} from "../service/ApiService";
import "./StockItem.css";
import arrow from "../pictures/refresh_arrow_4502.png";
import edit from "../pictures/pencil.png";



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
                    <img src={(arrow)} alt={"what?"} className={"arrow"} title="Refresh"  onClick={() => RefreshDataStock()}/>
                    <p>Name:    {props.stock.symbol}</p>
                    {price.length>1
                    ?
                    <p>Price:   {price}$</p>
                    :
                    <p>Price:   {props.stock.close}$</p>}
                    <p>Date:    {splitDate(props.stock.date)}</p>
                    <p>Shares:  {props.stock.shares}
                    <img src={(edit)} alt={"what?"} className={"edit"} title="Edit"  onClick={() => setEditMode(true)}/>
                        {editMode?
                            <div style={{display: "inline"}}>
                                <input className={"Input-Share"} type="text" placeholder={"Shares"} value={share} onChange={ev => setShare(ev.target.value)}/>
                                <button className={"Save-Button"} onClick={() => editShares(props.stock)}> Save </button>
                             </div>: null
                        }
                    </p>
                    <p>Value:   {product(props.stock.close, props.stock.shares)}$</p>
                    <button className={"Button-Item"} onClick={() => deleteFunction(props.stock)} > Delete stock </button>
                    <button className={"Button-Item"} onClick={() => RefreshDataStock()} > <i>Details Placeholder</i></button>
                </h4>
        </div>
    )
}