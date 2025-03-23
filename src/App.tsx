import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="flex flex-col h-screen">
                    <Header />
                    <div className="flex-grow flex justify-center">
                        <div className="max-w-7xl w-full px-2">
                            <Routes>
                                <Route path="/" element={<Home />} />
                            </Routes>
                        </div>
                    </div>
                </div>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
