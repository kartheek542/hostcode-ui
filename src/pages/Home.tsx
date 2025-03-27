import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <h1>This is Home Component</h1>
            <p>
                <Link to="/signup">Click here to Signup</Link>
            </p>
        </>
    );
}

export default Home;
