import {StockItem} from "./StockModel";


export const searchStock = (symbol : string) => {
    return fetch(`/api/stock/${symbol}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok){
                return response.json()
            } else {
                throw Error("Stock with the name "+symbol+" is not existing!")
            }
        })
}

