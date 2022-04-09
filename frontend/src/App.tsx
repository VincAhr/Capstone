import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import DepotPage from "./pages/DepotPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./auth/AuthProvider";

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path={'/'} element={<MainPage/>}/>
                        <Route path={'/login'} element={<LoginPage/>}/>
                        <Route path={'/DepotPage'} element={<DepotPage/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
