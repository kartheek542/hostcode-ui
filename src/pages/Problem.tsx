import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../API/apiClient";
import Editor from "@monaco-editor/react"; // Monaco Editor (used by VS Code)
import { MathJaxFormat } from "../components/custom_components/MathJaxFormat";
import { FaPaperPlane } from "react-icons/fa";
import Cookies from "js-cookie";

interface IProblemDetails {
    pid: number;
    name: string;
    description: string;
    constraints: string;
    sample_input: string;
    sample_output: string;
    contest_id: number;
    explanation: string;
    score: number;
    input_format: string;
    output_format: string;
}

interface ILanguages {
    lid: number;
    language: string;
}

const languageMap: { [key: string]: string } = {
    "jdk-17": "java",
    "python-3.9": "python",
    "cpp-17": "cpp",
    javascript: "javascript",
};

function Problem() {
    const { problemId, contestId } = useParams();
    const [problemDetails, setProblemDetails] =
        useState<IProblemDetails | null>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [code, setCode] = useState("// Write your code here...");
    const [languages, setLanguages] = useState<ILanguages[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState("javascript");

    const findLanguageId = (langName: string): number => {
        const lang = languages.find((l) => l.language === langName);
        return lang ? lang.lid : -1; // Return the ID if found, else null
    };

    console.log("selectedLanguage", selectedLanguage);

    const submiteTheCode = async (code: string, selectedLanguage: string) => {
        try {
            console.log("submitting code..");
            const token = Cookies.get("HOSTCODE_ACCESS_TOKEN");
            const config = {
                timeout: 60000,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const requestBody = {
                problemId,
                languageId: findLanguageId(selectedLanguage),
                code,
            };
            const response = await apiClient.post(
                "/problems/submit",
                requestBody,
                config
            );
            if (response.status == 200) {
                navigate(`/contest/${contestId}/submissions`);
            }
        } catch (error: unknown) {
            console.log(error);
            setLoading(false);
            if (error instanceof AxiosError) {
                setError(
                    error.response?.data.message || "Error fetching problem"
                );
            } else {
                setError("Unknown error, please try again later.");
            }
        }
    };

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
            const langResponse = await apiClient.get("/problems/languages");
            console.log("langResponse", langResponse);
            setLanguages(langResponse.data.languages);
            setSelectedLanguage(langResponse.data.languages[0].language);
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
    // console.log("languages", languages);

    return (
        <div className="flex h-screen w-full">
            {/* LEFT PANEL - PROBLEM DETAILS */}
            <div className="w-1/2 p-6 overflow-y-auto border-r border-gray-300">
                <h1 className="text-3xl font-bold mb-4">
                    {problemDetails?.name}
                </h1>
                <p className="text-gray-700 text-lg mb-4">
                    <MathJaxFormat
                        statement={(problemDetails?.description || "").replace(
                            /\\\\/g,
                            "\\"
                        )}
                    />
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
                        {problemDetails?.input_format}
                    </pre>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold">📤 Output Format</h2>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {problemDetails?.output_format}
                    </pre>
                </div>
                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold">📥 Sample Input</h2>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {problemDetails?.sample_input}
                    </pre>
                </div>

                <div className="border-t border-gray-300 mt-4 pt-4">
                    <h2 className="text-xl font-semibold">📤 Sample Output</h2>
                    <pre className="bg-gray-100 p-3 rounded-md text-sm whitespace-pre-wrap">
                        {problemDetails?.sample_output}
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

                {/* Language Selector */}
                {languages && (
                    <select
                        className="mb-3 p-2 border rounded-md w-1/4"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option key={lang.lid} value={lang.language}>
                                {lang.language.toUpperCase()}
                            </option>
                        ))}
                    </select>
                )}

                {/* Code Editor */}
                <div className="border rounded-lg flex-grow">
                    <Editor
                        height="75vh"
                        language={languageMap[selectedLanguage]}
                        theme="vs-dark"
                        value={code}
                        onChange={(newValue) => setCode(newValue || "")}
                    />
                </div>

                {/* Submit Button */}
                <button
                    onClick={() => {
                        submiteTheCode(code, selectedLanguage);
                    }}
                    className="mt-4 justify-center bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
                >
                    <FaPaperPlane />
                    Submit
                </button>
            </div>
        </div>
    );
}

export default Problem;
