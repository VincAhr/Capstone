import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StockInfo from "../components/StockInfo";
import StockList from "../components/StockList";


export default function MainPage(){


    return(
        <div className={'main'}>
            <Header/>
            <SearchBar/>
            <StockInfo/>
            <StockList/>
        </ div>
    )
}