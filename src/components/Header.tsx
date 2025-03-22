import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons

interface Tab {
    label: string;
    url: string;
}

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        console.log("toggling menu");
        setIsOpen((prevState) => !prevState);
    };

    const tabs: Array<Tab> = [
        {
            label: "Contests",
            url: "#",
        },
        {
            label: "Gym",
            url: "#",
        },
        {
            label: "Login",
            url: "#",
        },
    ];

    return (
        <header className="bg-gray-800 text-white flex justify-center">
            <div className="flex w-full max-w-7xl">
                <div className="flex-grow px-2 py-2">
                    <h1 className="text-xl font-bold">hostcode</h1>
                </div>
                <div className="px-2 py-2 flex flex-col justify-center md:hidden">
                    <button onClick={toggleMenu}>
                        <FaBars />
                    </button>
                </div>
                <div className="hidden md:flex">
                    <nav className="flex items-center h-full">
                        {tabs.map((eachTab, id) => (
                            <a key={id} href={eachTab.url} className="px-2 py-2 hover:bg-gray-700 rounded-md">
                                {eachTab.label}
                            </a>
                        ))}
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
                    className={`absolute right-0 top-0 h-full bg-gray-600 w-64 transform transition-transform duration-300 ease-in-out ${
                        isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex justify-end items-center">
                        <button className="px-2 py-2" onClick={toggleMenu}>
                            <FaTimes />
                        </button>
                    </div>
                    <nav className="flex flex-col px-2 space-y-6">
                        {tabs.map((eachTab, id) => (
                            <a key={id} href={eachTab.url}>
                                {eachTab.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;

// `fixed top-0 right-0 h-full w-64 bg-gray-800 transform ${ isOpen ? "translate-x-0" : "translate-x-full" } transition-transform duration-300 ease-in-out md:hidden z-50`
