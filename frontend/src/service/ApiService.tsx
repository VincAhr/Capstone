import {LoginData, RegisterData} from "../model/UserModel";

export const searchStock = (symbol : string, token: string) => {
    return fetch(`/api/stock/${symbol}`,{
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
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

export const postNewStock = (symbol: string, close: string, token: string) => {
    return fetch('/api/stock', {
        method: 'POST',
        headers: {
             Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({'symbol': symbol, 'close': close})

    })
        .then(response => response.json())
        .catch(e => console.log(e.message))
}

export const registerNewUser = ({username, password, passwordAgain} : RegisterData) => {
    return fetch(`/api/user`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username':username, 'password':password, 'passwordAgain':passwordAgain})
    })
        .then(response => response.json())
}

export const loginUser = ({username, password} : LoginData) =>{
    return fetch(`/api/user/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'username':username, 'password':password})
    })
        .then(response => response.json())
}
