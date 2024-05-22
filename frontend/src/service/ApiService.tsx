import {LoginData, RegisterData} from "../model/UserModel";
import {Stock} from "../model/StockModel";

const ApiNotResponding: string = "Server is not responding";

export const registerNewUser = ({username, password, passwordAgain}: RegisterData) => {
    return fetch(`/api/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': password, 'passwordAgain': passwordAgain})
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response.status, response.statusText)
                throw new Error(response.statusText + " " + response.status.toString())
            }
        })
}

export const loginUser = ({username, password}: LoginData) => {
    return fetch(`/api/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username': username, 'password': password})
    }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log(response.status, response.statusText)
                throw new Error(response.statusText + " " + response.status.toString())
            }
        })
}

export const searchStock = (symbol: string, token: string) => {
    return fetch(`/stock/api/${symbol}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error(ApiNotResponding)
            }
        })
}

export const getAllStocks = async (token: string) => {
    try {
        const response = await fetch('/stock/all', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if(response.json !== undefined){
            return response.json();
        }
    } catch (e) {
        console.log(e);
    }
}

export const getStock = async (id: string, token: string) => {
    try {
        const response = await fetch(`/stock/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        if(response.json !== undefined){
            return response.json();
        }
    } catch (e) {
        console.log(e);
    }
}


export const postNewStock = (symbol: string, name: string ,close: string, date: string, shares: string, token: string) => {
    return fetch('/stock', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'symbol': symbol, 'name': name,  'close': close, 'date': date, 'shares': shares})

    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}

export const updateStock = (stock: Stock, token: string) => {
    return fetch(`/stock/`, {
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
    return fetch(`/stock/delete/${id}`,{
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}
