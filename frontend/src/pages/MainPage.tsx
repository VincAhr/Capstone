import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import StockList from "../components/StockList";
import NavBar from "../components/NavBar";


export default function MainPage(){



    return(
        <div className={'main'}>
            <NavBar/>
            <Header/>
            <SearchBar/>
            <StockList/>
        </ div>
    )
}