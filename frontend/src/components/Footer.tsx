import "./Footer.css";
import logo from "../pictures/NYSE.jpg";


export default function Footer () {


    return(
        <div className={"footer-container"} >
            <h1 className={"footer-content"}>
                <img src={(logo)} alt={"not working"} className={"footer-button"}   onClick={() => window.open("https://www.nyse.com/listings_directory/stock")}/>
            </h1>
        </div>
    )
}