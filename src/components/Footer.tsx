import { BsTelephone } from "react-icons/bs";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-500 flex py-1 justify-center text-sm">
            <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-7xl py-1">
                <div className="px-2 flex items-center">
                    <FaEnvelope className="mr-1" />
                    <span>kartheekdivvela@gmail.com</span>
                </div>
                <div className="px-2 flex flex-grow items-center">
                    <BsTelephone className="mr-1" /> <span>7569929863</span>
                </div>
                <div className="px-2 text-gray-500 order-3 md:hidden">
                    {" "}
                    Version 1.0{" "}
                </div>
                <div className="px-2 text-gray-500 hidden md:block">
                    {" "}
                    Ver 1.0{" "}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
