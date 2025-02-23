import { useState } from "react";
import "./App.css";
import apiClient from "./API/apiClient";

function App() {
    const [backendMessage, setBackendMessage] = useState("");
    const [clicked, setClicked] = useState(false);

    const handleButtonClick = async () => {
        if (clicked) {
            setClicked(false);
            setBackendMessage("");
        } else {
            const response = await apiClient.get("/api/hello");
            if (response.status === 200) {
                setBackendMessage(response.data.message);
            } else {
                setBackendMessage("Error occured");
            }
            setClicked(true);
        }
    };

    return (
        <>
            <h1>Welcome to Hostcode</h1>
            <div>
                <button onClick={handleButtonClick}>Hit Backend</button>
                {clicked && <p>Message from Backend is {backendMessage}</p>}
            </div>
        </>
    );
}

export default App;
