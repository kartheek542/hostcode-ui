import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import apiClient from "../API/apiClient";

interface ISubmission {
    submission_id: number;
    problem_id: number;
    problem_name: string;
    language: string;
    submission_status_lablel: string;
}

function MySubmission() {
    const { contestId } = useParams();
    const [submissions, setSubmissions] = useState<ISubmission[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                console.log("Fetching submissions...");
                const token = Cookies.get("HOSTCODE_ACCESS_TOKEN");
                const config = {
                    timeout: 60000,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await apiClient.get(
                    `/contests/${contestId}/mysubmissions`,
                    config
                );
                console.log("Response:", response.data);
                setSubmissions(response.data.submissions);
            } catch (err: unknown) {
                console.error(err);
                if (err instanceof AxiosError) {
                    setError(
                        err.response?.data.message ||
                            "Error fetching submissions"
                    );
                } else {
                    setError("Unknown error, please try again later.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [contestId]);

    if (loading) return <p>Loading submissions...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">
                📜 My Submissions for Contest {contestId}
            </h2>
            {submissions.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Submission ID</th>
                                <th className="border p-2">Problem Name</th>
                                <th className="border p-2">Language</th>
                                <th className="border p-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submissions.map((submission) => (
                                <tr
                                    key={submission.submission_id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="border p-2 text-center">
                                        {submission.submission_id}
                                    </td>
                                    <td className="border p-2">
                                        {submission.problem_name}
                                    </td>
                                    <td className="border p-2">
                                        {submission.language}
                                    </td>
                                    <td className="border p-2 text-center font-semibold">
                                        {submission.submission_status_lablel}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No submissions found.</p>
            )}
        </div>
    );
}

export default MySubmission;
