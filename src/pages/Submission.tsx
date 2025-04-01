import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../API/apiClient";
import Cookies from "js-cookie";

interface ISubmissionDetail {
    sid: number;
    problem_id: number;
    submission_status: string;
    user_id: number;
    username: string;
    submitted_at: string;
    code: string;
    result: string | null;
    problem_name: string;
    language: string;
}

const Submission = () => {
    const { submissionId } = useParams();

    const [submission, setSubmission] = useState<ISubmissionDetail>({
        sid: 0,
        problem_id: 0,
        submission_status: "",
        user_id: 0,
        username: "",
        submitted_at: "",
        code: "",
        result: "",
        problem_name: "",
        language: "",
    });

    const fetchSubmissionDetails = async () => {
        const token = Cookies.get("HOSTCODE_ACCESS_TOKEN");
        const config = {
            timeout: 60000,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await apiClient.get(
            `/submission/${submissionId}`,
            config,
        );
        setSubmission(response.data.submission);
    };

    useEffect(() => {
        fetchSubmissionDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div>
                <h1>This is Submission component</h1>
            </div>
            <div>
                <p>Submission id: {submission.sid}</p>
                <p>Problem id: {submission.problem_id}</p>
                <p>Submission status: {submission.submission_status}</p>
                <p>User id: {submission.user_id}</p>
                <p>Username: {submission.username}</p>
                <p>Submitted at: {submission.submitted_at}</p>
                <p>Code: {submission.code}</p>
                {submission.result && (<p>Result: {JSON.stringify(submission.result)}</p>)}
                <p>Problem name: {submission.problem_name}</p>
                <p>Language name: {submission.language}</p>
            </div>
        </div>
    );
};

export default Submission;
