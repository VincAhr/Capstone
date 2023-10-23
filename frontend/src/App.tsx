import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from  "./pages/RegisterPage";
import AuthProvider from "./auth/AuthProvider";
import './App.css';

function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path={'/home'} element={<MainPage/>}/>
                        <Route path={'/login'} element={<LoginPage/>}/>
                        <Route path={'/register'} element={<RegisterPage/>}/>
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
