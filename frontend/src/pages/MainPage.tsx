import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import NavBar from "../components/NavBar";
import StockList from "../components/StockList";
import Footer from "../components/Footer";
import {PieChart} from "../components/PieChart";
import {getAllStocks} from "../service/ApiService";
import {useAuth} from "../auth/AuthProvider";
import React, {useCallback, useEffect, useState} from "react";
import {Stock} from "../model/StockModel";
import "./Pages.css"

export default function MainPage(){

    const [stocks, setStocks] = useState([] as Array<Stock>)
    const [totalValue, setTotalValue] = useState(0)
    const [error, setError] = useState("")
    const [price, setPrice] = useState([] as Array<number>)
    const [name, setName] = useState([] as Array<string>)
    const {token} = useAuth()

    const creatPriceArray = useCallback (() => {
        setPrice([...stocks.map(value => parseFloat((parseFloat(value.close)*parseFloat(value.shares)).toFixed(2)))])

    }, [stocks])

    const createNameArray = useCallback (() => {
        setName([...stocks.map(value => value.name)])
    }, [stocks])

    const total = useCallback(() => {
        let sum = 0
        for (let i = 0; i < stocks.length; i++) {
            sum += (parseFloat(stocks[i].close) * parseFloat(stocks[i].shares))
        } setTotalValue(sum)
    }, [stocks])

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try{
                const response = await getAllStocks(token)
                if (isMounted) {
                    setStocks(response)
                }
            } catch (e: unknown) {
                if (isMounted) {
                    if (e instanceof Error) {
                        setError(e.message)
                    } else {
                        setError('An unknown error occurred.')
                    }
                }
            }
        };

        fetchData().finally(() => {
          isMounted = false;
        })

        return () => {
            isMounted = false;
        };
    }, [token]);

    useEffect(() => {
        total()
        creatPriceArray()
        createNameArray()
    },[stocks, total, creatPriceArray, createNameArray ])


    return(
        <div className={'mainPage'}>
            <NavBar/>
            <Header/>
            <SearchBar onAddStock={getAllStocks} />
            <h2>{error}</h2>
            <div className={"depotList-banner"} >
            </div>
            <div className={"flex-container"}>
            <div style={{order: 1}} className={"stockList-container"}> <StockList  allStocks={stocks} updateStock={getAllStocks}/></div>
            <div style={{order: 2}} className={"pieChart-container"}> <PieChart names={name} price={price} totalValue={totalValue}/></div>
            </div>
            <Footer/>
        </div>
    )
}