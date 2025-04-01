import { AxiosError } from "axios";
import apiClient from "../API/apiClient";
import { useEffect, useState } from "react";
import CountdownTimer from "../components/custom_components/CountdownTimer";
import RegisterPopup from "../components/custom_components/RegisterPopup";
import { Link } from "react-router-dom";

interface IAuthor {
    user_id: number;
    username: string;
}

interface IContest {
    cid: number;
    name: string;
    start_time: string;
    end_time: string;
    authors: IAuthor[];
}

interface IALLContests {
    running?: IContest[];
    upcoming?: IContest[];
    recent?: IContest[];
}

function Contests() {
    const [contests, setContests] = useState<IALLContests>({
        running: [],
        upcoming: [],
        recent: [],
    });

    // Running Contests Component
    const RunningContests = ({ contests }: { contests?: IContest[] }) => (
        <div>
            <h2 className="text-2xl font-bold mb-4">🏃‍♂️ Running Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contests && contests.length > 0 ? (
                    contests.map((contest) => (
                        <Link
                            key={contest.cid}
                            to={`/contests/${contest.cid}`}
                            className="block cursor-pointer"
                        >
                            <ContestCard
                                key={contest.cid}
                                contest={contest}
                                showTimer
                                timerLabel="Ends In"
                            />
                        </Link>
                    ))
                ) : (
                    <p>No running contests</p>
                )}
            </div>
        </div>
    );
    // Sample Card Component for Contests

    const ContestCard = ({
        contest,
        showTimer,
        timerLabel,
    }: {
        contest: IContest;
        showTimer: boolean;
        timerLabel?: string;
    }) => {
        const [isPopupOpen, setIsPopupOpen] = useState(false);
        const now = new Date().getTime();
        const startTime = new Date(contest.start_time).getTime();
        const isUpcoming = now < startTime; // Check if contest is upcoming

        return (
            <div className="p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold">{contest.name}</h3>
                <p className="text-gray-600">
                    Start: {new Date(contest.start_time).toLocaleString()}
                </p>
                <p className="text-gray-600">
                    End: {new Date(contest.end_time).toLocaleString()}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    Authors:{" "}
                    {contest.authors
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        .map((author: any) => author.username)
                        .join(", ")}
                </p>

                {/* Show countdown timer if enabled */}
                {showTimer && timerLabel && (
                    <CountdownTimer
                        startTime={contest.start_time}
                        endTime={contest.end_time}
                        label={timerLabel}
                    />
                )}

                {/* Show Register button for upcoming contests */}
                {isUpcoming && (
                    <button
                        onClick={() => setIsPopupOpen(true)}
                        className="mt-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition cursor-pointer"
                    >
                        Register
                    </button>
                )}

                <RegisterPopup
                    isOpen={isPopupOpen}
                    onClose={() => setIsPopupOpen(false)}
                    contestId={contest.cid}
                />
            </div>
        );
    };

    // Upcoming Contests Component
    const UpcomingContests = ({ contests }: { contests?: IContest[] }) => (
        <div>
            <h2 className="text-2xl font-bold mb-4">🚀 Upcoming Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contests && contests.length > 0 ? (
                    contests.map((contest) => (
                        <ContestCard
                            key={contest.cid}
                            contest={contest}
                            showTimer
                            timerLabel="Starts In"
                        />
                    ))
                ) : (
                    <p>No upcoming contests</p>
                )}
            </div>
        </div>
    );

    // Recent Contests Component
    const RecentContests = ({ contests }: { contests?: IContest[] }) => (
        <div>
            <h2 className="text-2xl font-bold mb-4">🎉 Recent Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contests && contests.length > 0 ? (
                    contests.map((contest) => (
                        <Link
                            key={contest.cid}
                            to={`/contests/${contest.cid}`}
                            className="block cursor-pointer"
                        >
                            <ContestCard
                                key={contest.cid}
                                contest={contest}
                                showTimer={false}
                            />
                        </Link>
                    ))
                ) : (
                    <p>No recent contests</p>
                )}
            </div>
        </div>
    );

    const getContests = async () => {
        try {
            console.log("getting contests...");
            const config = {
                timeout: 60000,
            };
            const response = await apiClient.get("/contests", config);
            console.log(response);
            setContests(response.data.contests);
        } catch (error: unknown) {
            console.log(error);
            if (error instanceof AxiosError) {
                // eslint-disable-next-line no-unsafe-optional-chaining
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
    }, []);

    return (
        <div className="container mx-auto p-6">
            <RunningContests contests={contests.running} />
            <hr className="my-6" />
            <UpcomingContests contests={contests.upcoming} />
            <hr className="my-6" />
            <RecentContests contests={contests.recent} />
        </div>
    );
}

export default Contests;
