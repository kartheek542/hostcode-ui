import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import apiClient from "../../API/apiClient";
import { AxiosError } from "axios";
import Cookies from "js-cookie";

interface RegisterPopupProps {
    isOpen: boolean;
    onClose: () => void;
    contestId: number;
}

const RegisterPopup = ({ isOpen, onClose, contestId }: RegisterPopupProps) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isVisible, setIsVisible] = useState(isOpen);
    const [message, setMessage] = useState("");

    const registerForContestWithId = async (id: number) => {
        try {
            console.log("registering contest...");
            const token = Cookies.get("HOSTCODE_ACCESS_TOKEN");
            const config = {
                timeout: 60000,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await apiClient.post(
                `/contests/${id}/register`,
                {},
                config
            );
            console.log(response);
            setMessage(response.data.message);
            setIsRegistered(true);
        } catch (error: unknown) {
            console.log(error);
            console.log("in catch block");
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

    // Handle fade-out animation before closing
    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            setTimeout(() => setIsVisible(false), 200); // Wait for fade-out animation
        }
    }, [isOpen]);

    if (!isVisible) return null; // Hide completely after animation

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-opacity-40 backdrop-blur-md 
                ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
        >
            {/* Popup Content */}
            <div
                className={`bg-white p-6 rounded-lg shadow-lg w-96 text-center transform 
                    ${isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"} transition-all duration-200`}
            >
                {isRegistered ? (
                    <>
                        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
                        <h2 className="text-lg font-semibold">{message}</h2>
                        <button
                            onClick={onClose}
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                        >
                            Close
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-lg font-semibold mb-4">
                            Register for Contest
                        </h2>
                        <p className="text-gray-700 mb-4">
                            By registering for this contest, you agree to our
                            terms and conditions.
                        </p>
                        <label className="flex items-center justify-center gap-2 mb-4">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                className="w-4 h-4"
                            />
                            <span>I agree to the terms and conditions</span>
                        </label>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border rounded-md bg-gray-300 hover:bg-gray-400 transition cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    registerForContestWithId(contestId)
                                }
                                disabled={!isChecked}
                                className={`px-4 py-2 rounded-md transition ${
                                    isChecked
                                        ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                                }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegisterPopup;
