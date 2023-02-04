import "./Footer.css";
import logo from "../pictures/NYSE.jpg";





export default function Footer () {



    return(
        <div className={"Footer-Container"} >
            <h1 className={"Footer-Content"}>
                <img src={(logo)} alt={"huh?"} className={"Footer-Button"}   onClick={() => window.open("https://www.nyse.com/listings_directory/stock")}/>
            </h1>
        </div>
    )

}