import Footer from "../components/Footer";
import Header from "../components/Header";

function Home() {
    return (
        <>
            <div className="flex flex-col h-screen">
                <Header />
                <div className="flex-grow flex justify-center">
                    <div className="max-w-7xl w-full px-2">
                        this is body
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;
