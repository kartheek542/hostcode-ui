import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contests from "./pages/Contests";
import ContestDetail from "./pages/ContestDetail";
import Problem from "./pages/Problem";
import Gym from "./pages/Gym";
import MySubmissions from "./pages/MySubmissions";
import GymSubmissions from "./pages/GymSubmissions";
import Submission from "./pages/Submission";

function App() {
    return (
        <>
            <BrowserRouter>
                <div className="flex flex-col min-h-screen">
                    <Header />

                    <div className="flex-grow flex justify-center">
                        <div className="max-w-7xl w-full flex flex-col items-center">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route
                                    path="/contests"
                                    element={<Contests />}
                                />
                                <Route
                                    path="/contests/:contestId"
                                    element={<ContestDetail />}
                                />
                                <Route
                                    path="/contests/:contestId/submissions"
                                    element={<MySubmissions />}
                                />
                                <Route
                                    path="/problems/:problemId"
                                    element={<Problem />}
                                />
                                <Route
                                    path="/contests/:contestId/:problemId"
                                    element={<Problem />}
                                />
                                <Route path="/gym" element={<Gym />} />
                                <Route
                                    path="/gym/submissions"
                                    element={<GymSubmissions />}
                                />
                                <Route
                                    path="/submission/:submissionId"
                                    element={<Submission />}
                                />
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
