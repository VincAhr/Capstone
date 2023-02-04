import {LoginData, RegisterData} from "../model/UserModel";
import {Stock} from "../model/StockModel";

export const registerNewUser = ({username, password, passwordAgain}: RegisterData) => {
    return fetch(`/api/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': password, 'passwordAgain': passwordAgain})
    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}

export const loginUser = ({username, password}: LoginData) => {
    return fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': password})
    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}

export const searchStock = (symbol: string, token: string) => {
    return fetch(`/api/stock/${symbol}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw Error("API can't be reached or searched value doesn't exist")
            }
        })
}

export const getAllStocks = (token: string) => {
    return fetch('api/stock', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
}


export const postNewStock = (symbol: string, close: string, date: string, token: string) => {
    return fetch('/api/stock', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'symbol': symbol, 'close': close, 'date': date, 'shares': "0"})

    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}

export const updateStock = (stock: Stock, token: string) => {
    return fetch(`/api/stock/`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(stock)
    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}

export const deleteStock = (id: string, token: string) => {
    return fetch(`/api/stock/${id}`,{
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}
