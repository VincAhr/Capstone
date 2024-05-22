import {Stock} from "../model/StockModel";
import React from "react";
import StockItem from "./StockItem";
import "./StockList.css"

interface StockListProps {
    allStocks: Array<Stock>
    updateStock: () => void
}

export default function StockList(props: StockListProps) {

    // Fallback when new implemented functionality not working as expected
    //<button className={"Button-Refresh"} onClick={() => props.updateStock()}> Refresh list </button>

    return(
        <div>
            <h4>
            <p>Total stocks   {props.allStocks.length.toString()}</p>
            {props.allStocks.map(stock => <StockItem key={stock.id} stock={stock} getAllStocks={props.updateStock}/>)}
            </h4>
        </div>
    )
}