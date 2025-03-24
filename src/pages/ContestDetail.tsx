import { useParams } from "react-router-dom";

function ContestDetail() {
    const { contestId } = useParams();
    return (
        <>
            <h1>This is contest detail Component for {contestId} </h1>
        </>
    );
}

export default ContestDetail;
