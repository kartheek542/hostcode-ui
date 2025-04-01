import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import apiClient from "../API/apiClient";

interface Problem {
    problem_id: number;
    problem_name: string;
}

interface ContestDetails {
    cid: number;
    name: string;
    description: string;
    start_time: string;
    end_time: string;
    problems: Problem[];
}

function ContestDetail() {
    const { contestId } = useParams();
    const [contest, setContest] = useState<ContestDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContestDetails = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(`/contests/${contestId}`);
            setContest(response.data.contestDetails);
            setLoading(false);
        } catch (error: unknown) {
            setLoading(false);
            if (error instanceof AxiosError) {
                setError(
                    error.response?.data.message ||
                        "Failed to load contest details.",
                );
            } else {
                setError("Unknown error occurred.");
            }
        }
    };

    useEffect(() => {
        fetchContestDetails();
    }, [contestId]);

    if (loading)
        return (
            <p className="text-center text-lg">Loading contest details...</p>
        );
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Contest Title */}
            <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">
                {contest?.name}
            </h1>
            <p className="text-gray-700 text-center mb-6">
                {contest?.description}
            </p>

            {/* Contest Timing */}
            <div className="flex justify-center gap-6 text-gray-600 mb-8">
                <p>
                    <strong>Start:</strong>{" "}
                    {new Date(contest?.start_time!).toLocaleString()}
                </p>
                <p>
                    <strong>End:</strong>{" "}
                    {new Date(contest?.end_time!).toLocaleString()}
                </p>
            </div>

            {/* Problems List */}
            <h2 className="text-2xl font-semibold mb-4">📝 Problems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {contest?.problems.map((problem) => (
                    <Link
                        key={contest.cid}
                        to={`/contests/${contestId}/${problem.problem_id}`}
                        className="block cursor-pointer"
                    >
                        <div
                            key={problem.problem_id}
                            className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
                        >
                            <h3 className="text-xl font-medium">
                                {problem.problem_name}
                            </h3>
                            <p className="text-gray-500">
                                Problem ID: {problem.problem_id}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ContestDetail;
