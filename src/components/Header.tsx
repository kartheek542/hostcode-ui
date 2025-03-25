import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserLoginStatus } from "../state/selectors";
import { removeToken } from "../state/authSlice";

interface Tab {
    label: string;
    url: string;
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = useSelector(getUserLoginStatus);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleMenu = () => {
        console.log("toggling menu");
        setIsOpen((prevState) => !prevState);
    };

    const removeUserSessionCookie = () => {
        console.log("removing cookie");
    };

    const handleUserSession = () => {
        if (isLoggedIn) {
            removeUserSessionCookie();
            dispatch(removeToken());
        }
        navigate("/login");
        setIsOpen(false);
    };

    const tabs: Array<Tab> = [
        {
            label: "Contests",
            url: "/contests",
        },
        {
            label: "Gym",
            url: "/gym",
        },
    ];

    return (
        <header className="bg-gray-800 text-white flex justify-center">
            <div className="flex w-full max-w-7xl">
                <div className="flex-grow px-2 py-2">
                    <h1 className="text-xl font-mono ">
                        <Link to="/" className="">
                            HOST
                            <span className="text-blue-600 font-bold">
                                CODE
                            </span>
                        </Link>
                    </h1>
                </div>
                <div className="px-2 py-2 flex flex-col justify-center md:hidden">
                    <button onClick={toggleMenu}>
                        <FaBars />
                    </button>
                </div>
                <div className="hidden md:flex">
                    <nav className="flex items-center h-full">
                        {tabs.map((eachTab, id) => (
                            <Link
                                key={id}
                                to={eachTab.url}
                                className="px-2 py-2 hover:bg-gray-700 rounded-md"
                            >
                                {eachTab.label}
                            </Link>
                        ))}
                        <button
                            className="px-2 py-2 hover:bg-gray-700 rounded-md"
                            onClick={handleUserSession}
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </nav>
                </div>
            </div>
            <div
                className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out md:hidden ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none op"
                }`}
            >
                <div
                    className="absolute inset-0 bg-opacity-50"
                    onClick={toggleMenu}
                ></div>
                <div
                    className={`absolute right-0 top-0 h-full bg-gray-600 w-54 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex justify-end items-center">
                        <button
                            className="text-xl px-2 py-2"
                            onClick={toggleMenu}
                        >
                            <FaTimes />
                        </button>
                    </div>
                    <nav className="flex flex-col px-2 items-center">
                        {tabs.map((eachTab, id) => (
                            <Link
                                key={id}
                                to={eachTab.url}
                                className="pt-6"
                                onClick={() => setIsOpen(false)}
                            >
                                {eachTab.label}
                            </Link>
                        ))}
                        <button
                            className="text-left pt-6"
                            onClick={handleUserSession}
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
