import { AxiosError } from "axios";
import apiClient from "../API/apiClient";
import { useEffect, useState } from "react";

function Contests() {
    const [contests, setContests] = useState({
        running: [],
        upcoming: [],
        recent: [],
    });

    console.log(contests);

    // Running Contests Component
    const RunningContests = ({ contests }: { contests: any[] }) => (
        <div>
            <h2 className="text-2xl font-bold mb-4">🏃‍♂️ Running Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contests.length ? (
                    contests.map((contest) => (
                        <ContestCard key={contest.cid} contest={contest} />
                    ))
                ) : (
                    <p>No running contests</p>
                )}
            </div>
        </div>
    );
    // Sample Card Component for Contests
    const ContestCard = ({ contest }: { contest: any }) => {
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
                        .map((author: any) => author.username)
                        .join(", ")}
                </p>
            </div>
        );
    };

    // Upcoming Contests Component
    const UpcomingContests = ({ contests }: { contests: any[] }) => (
        <div>
            <h2 className="text-2xl font-bold mb-4">🚀 Upcoming Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contests.length ? (
                    contests.map((contest) => (
                        <ContestCard key={contest.cid} contest={contest} />
                    ))
                ) : (
                    <p>No upcoming contests</p>
                )}
            </div>
        </div>
    );

    // Recent Contests Component
    const RecentContests = ({ contests }: { contests: any[] }) => (
        <div>
            <h2 className="text-2xl font-bold mb-4">🎉 Recent Contests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contests.length ? (
                    contests.map((contest) => (
                        <ContestCard key={contest.cid} contest={contest} />
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
