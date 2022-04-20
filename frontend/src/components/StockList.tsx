import {Stock} from "../model/StockModel";
import React from "react";
import StockItem from "./StockItem";

interface StockListProps {
    allStocks: Array<Stock>
    value: number
    updateStock: () => void
}


export default function StockList(props: StockListProps) {

    return(
        <div>
            <h2 style={{backgroundColor: "grey"}}> Depotlist</h2>
            <button style={{inlineSize:100, marginLeft: 20}} onClick={() => props.updateStock()}> Refresh list </button>
            <h4 style={{backgroundColor: "", marginLeft: 20}}>
            {props.allStocks.map(stock => <StockItem stock={stock} value={props.value} updateStock={props.updateStock}/>)}
            </h4>
        </div>
    )
}