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
            <h4 className={"StockList"}>
                {props.allStocks.length}
                <button className={"Button-refresh"} onClick={() => props.updateStock()}> Refresh list </button>
                {props.allStocks.map(stock => <StockItem stock={stock} value={props.value} getAllStocks={props.updateStock}/>)}
            </h4>
        </div>
    )
}