import {Stock} from "../model/StockModel";
import React from "react";
import StockItem from "./StockItem";
import "./StockList.css"

interface StockListProps {
    allStocks: Array<Stock>
    value: number
    updateStock: () => void
}


export default function StockList(props: StockListProps) {

    return(
        <div>
            <button className={"Button-Refresh"}  onClick={() => props.updateStock()}> Refresh list </button>
            <h4 style={{backgroundColor: "", marginLeft: 20}}>
            {props.allStocks.map(stock => <StockItem stock={stock} value={props.value} updateStock={props.updateStock}/>)}
            </h4>
        </div>
    )
}