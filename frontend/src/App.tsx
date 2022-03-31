import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import DepotPage from "./pages/DepotPage";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<MainPage/>}/>
                        <Route path={'/DepotPage'} element={<DepotPage/>}/>
                    </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
