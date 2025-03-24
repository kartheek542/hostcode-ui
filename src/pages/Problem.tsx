import { useParams } from "react-router-dom";

function Problem() {
    const { problemId } = useParams();
    return (
        <>
            <h1>This is Problem Component for {problemId} </h1>
        </>
    );
}

export default Problem;
