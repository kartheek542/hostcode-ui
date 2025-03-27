import { useState, useEffect } from "react";

interface CountdownTimerProps {
    startTime: string; // Contest start time
    endTime: string; // Contest end time
    label: string; // Label for the timer (e.g., "Starts In", "Ends In")
}

const CountdownTimer = ({ startTime, endTime, label }: CountdownTimerProps) => {
    const [timeLeft, setTimeLeft] = useState(
        getRemainingTime(startTime, endTime)
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getRemainingTime(startTime, endTime));
        }, 1000);

        return () => clearInterval(timer);
    }, [startTime, endTime]);

    function getRemainingTime(startTime: string, endTime: string) {
        const now = new Date().getTime();
        const start = new Date(startTime).getTime();
        const end = new Date(endTime).getTime();

        if (now < start) {
            return calculateTimeDiff(start - now); // Time until contest starts
        } else if (now < end) {
            return calculateTimeDiff(end - now); // Time until contest ends
        } else {
            return "Contest Ended";
        }
    }

    function calculateTimeDiff(diff: number) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    return (
        <p className="mt-2 text-lg font-semibold text-blue-600">
            ⏳ {label}: {timeLeft}
        </p>
    );
};

export default CountdownTimer;
