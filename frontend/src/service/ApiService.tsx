
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

export const postNewStock = (symbol: string, close: string) => {
    return fetch('/api/stock', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'symbol': symbol, 'close': close})

    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}
