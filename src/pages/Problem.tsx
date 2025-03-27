import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../API/apiClient";
import Editor from "@monaco-editor/react"; // Monaco Editor (used by VS Code)

interface IProblemDetails {
    pid: number;
    name: string;
    description: string;
    constraints: string;
    input: string;
    output: string;
    contest_id: number;
    explanation: string;
    score: number;
}

function Problem() {
    const { problemId } = useParams();
    const [problemDetails, setProblemDetails] =
        useState<IProblemDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [code, setCode] = useState("// Write your code here...");

    const getProblemDetails = async () => {
        try {
            console.log("Fetching problem details...");
            const config = { timeout: 60000 };
            const response = await apiClient.get(
                `/problems/${problemId}`,
                config,
            );
            console.log(response);
            setProblemDetails(response.data.problem);
            setLoading(false);
        } catch (error: unknown) {
            console.log(error);
            setLoading(false);
            if (error instanceof AxiosError) {
                setError(
                    error.response?.data.message || "Error fetching problem",
                );
            } else {
                setError("Unknown error, please try again later.");
            }
        }
    };

    useEffect(() => {
        getProblemDetails();
    }, []);

    if (loading)
        return (
            <div className="text-center text-lg mt-6">
                Loading problem details...
            </div>
        );
    if (error)
        return (
            <div className="text-center text-red-500 text-lg mt-6">{error}</div>
        );

    return (
        <div className="flex h-screen w-full">
            {/* LEFT PANEL - PROBLEM DETAILS */}
            <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-4">
                    {problemDetails?.name}
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                    {problemDetails?.description}
                </p>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold">📝 Constraints</h2>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {problemDetails?.constraints}
                    </pre>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold">📥 Input Format</h2>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {problemDetails?.input}
                    </pre>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold">📤 Output Format</h2>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {problemDetails?.output}
                    </pre>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold">💡 Explanation</h2>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {problemDetails?.explanation}
                    </pre>
                </div>

                <div className="mt-6 text-lg">
                    <span className="font-bold">🏆 Score:</span>{" "}
                    {problemDetails?.score}
                </div>
            </div>

            {/* RIGHT PANEL - CODE EDITOR */}
            <div className="w-1/2 p-6 flex flex-col">
                <h2 className="text-xl font-semibold mb-3">💻 Code Editor</h2>
                <div className="border rounded-lg flex-grow">
                    <Editor
                        height="75vh"
                        defaultLanguage="javascript"
                        theme="vs-dark"
                        value={code} // <-- Use the state here
                        onChange={(newValue) => setCode(newValue || "")} // <-- Update state on change
                    />
                </div>

                {/* Run Button */}
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    ▶️ Run Code
                </button>
            </div>
        </div>
    );
}

export default Problem;
