import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import StockList from "../components/StockList";
import {PieChart} from "../components/PieChart";
import {getAllStocks} from "../service/ApiService";
import {useAuth} from "../auth/AuthProvider";
import React, {useEffect, useState} from "react";
import {Stock} from "../model/StockModel";



export default function MainPage(){

    const {token} = useAuth()
    const [stocks, setStocks] = useState([] as Array<Stock>)
    const [totalValue, setTotalValue] = useState(0)
    const [error, setError] = useState("")
    const [price, setPrice] = useState([] as Array<number>)
    const [name, setName] = useState([] as Array<string>)

    useEffect(() => {
      getStocks()
    }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        total()
        creatPriceArray()
        createNameArray()
    },[stocks]) // eslint-disable-line react-hooks/exhaustive-deps

    const getStocks = () => {
        getAllStocks(token)
            .then(response => setStocks(response))
            .catch(e => setError(e.message))
    }

    const total = () => {
        let sum = 0
        for (let i = 0; i < stocks.length; i++) {
            sum += (parseFloat(stocks[i].close) * parseFloat(stocks[i].shares))
        } setTotalValue(sum)
    }

    const creatPriceArray = () => {
        setPrice([...stocks.map(value => parseFloat((parseFloat(value.close)*parseFloat(value.shares)).toFixed(2)))])

    }

    const createNameArray = () => {
        setName([...stocks.map(value => value.symbol)])
    }


    return(
        <div className={'main'}>
            <NavBar/>
            <Header/>
            <SearchBar onAddStock={getStocks} />
            <h2>{error}</h2>
            <div> <StockList allStocks={stocks} value={totalValue} updateStock={getStocks}/></div>
            <div className={"PieChart-Container"}> <PieChart names={name} price={price}/></div>
            <div><h1>Total value: <p>{totalValue.toFixed(2)}$</p></h1></div>
        </div>
    )
}