import "./Footer.css";
import logo from "./GitHub_Logo_White.png";





export default function Footer () {



    return(
        <div className={"Footer-Container"} >
            <h1 className={"Footer-Content"}>
                <img src={(logo)} alt={"Fuck it"} className={"Footer-Button"}   onClick={() => window.open("https://github.com/VincAhr")}/>
            </h1>
        </div>
    )

}