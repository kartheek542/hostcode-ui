import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import apiClient from "../API/apiClient";
import Cookies from "js-cookie";
import { Editor } from "@monaco-editor/react";
import { useSelector } from "react-redux";
import { getUserLoginStatus } from "../state/selectors";

interface TestExecution {
    testName: string;
    testStatus: string;
}

interface ISubmissionDetail {
    sid: number;
    problem_id: number;
    submission_status: string;
    user_id: number;
    username: string;
    submitted_at: string;
    code: string;
    result: { testExecutions: [] };
    problem_name: string;
    language: string;
    isLoading: boolean;
}

const languageMap: { [key: string]: string } = {
    "jdk-17": "java",
    "python-3.9": "python",
    "cpp-17": "cpp",
    javascript: "javascript",
};

const Submission = () => {
    const { submissionId } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(getUserLoginStatus);

    const [submission, setSubmission] = useState<ISubmissionDetail>({
        sid: 0,
        problem_id: 0,
        submission_status: "",
        user_id: 0,
        username: "",
        submitted_at: "",
        code: "",
        result: { testExecutions: [] },
        problem_name: "",
        language: "",
        isLoading: true,
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
        setSubmission({ ...response.data.submission, isLoading: false });
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        fetchSubmissionDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const lineCount = submission.code.split("\n").length;

    if (submission.isLoading) {
        return <div>Loading...</div>;
    }

    const calculateAggTestStatus = () => {
        const aggTestResult: { [key: string]: number } = {};
        console.log("Parsing:", submission.result);
        if(!submission.result) {
            return {}
        }
        const { testExecutions } = submission.result;
        testExecutions.forEach((test: TestExecution) => {
            if (aggTestResult[test.testStatus]) {
                aggTestResult[test.testStatus]++;
            } else {
                aggTestResult[test.testStatus] = 1;
            }
        });
        return aggTestResult;
    };

    const testAgg = calculateAggTestStatus();

    return (
        <div className="h-full w-full">
            <div>
                <h1 className="text-2xl font-bold p-2">
                    Submission #{submission.sid}
                </h1>
            </div>
            <div className="w-full max-h-[50vh] overflow-auto px-2">
                <Editor
                    height={`${19 * lineCount}px`}
                    language={languageMap[submission.language]}
                    theme="vs-dark"
                    value={submission.code}
                    options={{
                        readOnly: true,
                        contextmenu: false,
                        cursorBlinking: "solid",
                        cursorStyle: "block",
                        showUnused: false,
                        quickSuggestions: false,
                        hover: { enabled: false },
                    }}
                />
            </div>
            <div className="px-2">
                <h1 className="text-xl font-bold p-2">Submission Info</h1>
                <div className="flex border text-sm bg-gray-200">
                    <div className="w-1/2 border-r ml-1 font-bold">
                        Submission Time
                    </div>
                    <div className="w-1/2 text-center">
                        {submission.submitted_at}
                    </div>
                </div>
                <div className="flex border-l border-b border-r text-sm">
                    <div className="w-1/2 border-r ml-1 font-bold">Problem</div>
                    <div className="w-1/2 text-center">
                        <Link
                            to={`/problem/${submission.problem_id}`}
                            className="underline text-blue-600"
                        >
                            {submission.problem_name}
                        </Link>
                    </div>
                </div>
                <div className="flex border-l border-b border-r text-sm bg-gray-200">
                    <div className="w-1/2 border-r ml-1 font-bold">User</div>
                    <div className="w-1/2 text-center">
                        <Link to={`#`} className="underline text-blue-600">
                            {submission.username}
                        </Link>
                    </div>
                </div>
                <div className="flex border-l border-b border-r text-sm">
                    <div className="w-1/2 border-r ml-1 font-bold">
                        Language
                    </div>
                    <div className="w-1/2 text-center">
                        {submission.language}
                    </div>
                </div>
                <div className="flex border-l border-b border-r text-sm bg-gray-200">
                    <div className="w-1/2 border-r ml-1 font-bold">Status</div>
                    <div className="w-1/2 text-center">
                        {submission.submission_status}
                    </div>
                </div>
            </div>
            {submission.result && (
                <div className="px-2">
                    <h1 className="text-xl font-bold p-2">Judge Result</h1>
                    <div className="flex border">
                        <div className="border-r p-2 w-1/4 text-center">
                            Status
                        </div>
                        <div className="flex-grow flex items-center justify-center">
                            {Object.keys(testAgg).map((testStatus) => (
                                <div className="flex items-center">
                                    <div className="text-xs bg-amber-300 p-1 rounded-md text-center mr-1">
                                        {testStatus}
                                    </div>
                                    <div className="text-xs">x</div>
                                    <div className="text-xs ml-1">
                                        {testAgg[testStatus]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="my-2">
                        <div className="flex border font-bold">
                            <div className="w-1/2 border-r text-center">
                                Test Case Name
                            </div>
                            <div className="w-1/2 text-center">
                                Test Case Status
                            </div>
                        </div>
                        {submission.result.testExecutions.map(
                            (eachTest: TestExecution) => (
                                <div className="flex border-r border-b border-l">
                                    <div className="w-1/2 border-r text-center">
                                        {eachTest.testName}
                                    </div>
                                    <div className="w-1/2 text-center">
                                        {eachTest.testStatus}
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Submission;
