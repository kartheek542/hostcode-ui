import { BsTelephone } from "react-icons/bs";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white flex justify-center">
            <div className="flex justify-center w-full max-w-7xl py-1">
                <div className="px-2 flex items-center"> <BsTelephone className="mr-1"/> 7569929863 </div>
                <div className="px-2 flex-grow"> kartheekdivvela@gmail.com </div>
                <div className="px-2 text-gray-500"> @1.0 </div>
            </div>
        </footer>
    );
};

export default Footer;
