import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import apiClient from "../API/apiClient";
import { useNavigate } from "react-router-dom";

interface IProblem {
    problem_id: number;
    problem_name: string;
    problem_score: number;
}

function Gym() {
    const navigate = useNavigate();

    const [problems, setProblems] = useState<IProblem[]>([]);
    const [totalProblems, setTotalProblems] = useState(0);
    const [problemsPerPage, setProblemsPerPage] = useState(25);
    const [currentPage, setCurrentPage] = useState(1);

    const getContests = async () => {
        try {
            console.log("getting contests...");
            const config = {
                timeout: 60000,
            };
            const response = await apiClient.get(
                `/problems?pageNum=${currentPage}&pageSize=${problemsPerPage}`,
                config,
            );
            console.log(response);
            setProblems(response.data.problems);

            setTotalProblems(response.data.totalRecords);
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof AxiosError) {
                const { message } = error.response?.data;
                return {
                    message,
                    status: false,
                };
            }
            return {
                message: "Unknown Error, Please try again after sometime",
                status: false,
            };
        }
    };

    useEffect(() => {
        getContests();
    }, [currentPage, problemsPerPage]);

    // Detect screen size and set problems per page
    useEffect(() => {
        const updateProblemsPerPage = () => {
            if (window.innerWidth < 768) {
                setProblemsPerPage(10); // Mobile
                setCurrentPage(1);
            } else {
                setProblemsPerPage(25); // Laptop
                setCurrentPage(1);
            }
        };

        updateProblemsPerPage();
        window.addEventListener("resize", updateProblemsPerPage);

        return () =>
            window.removeEventListener("resize", updateProblemsPerPage);
    }, []);

    const totalPages = Math.ceil(totalProblems / problemsPerPage);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">📝 Problems List</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                {problems.map((problem) => (
                    <div
                        key={problem.problem_id}
                        className="p-3 border-b last:border-0 cursor-pointer hover:bg-gray-100 transition duration-200"
                        onClick={() =>
                            navigate(`/problems/${problem.problem_id}`)
                        }
                    >
                        <h3 className="text-lg font-semibold">
                            {problem.problem_name}
                        </h3>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span className="text-lg">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Gym;
