import { SetStateAction, useState } from "react";
import { FaCircleUser, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../API/apiClient";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setToken } from "../state/authSlice";
import { AxiosError } from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [isLoginProcessing, setIsLoginProcessing] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateUsername = (value: SetStateAction<string>) => {
        if (value === "") {
            setUsernameError(true);
            return true;
        } else {
            setUsernameError(false);
            return false;
        }
    };

    const validatePassword = (value: SetStateAction<string>) => {
        if (value === "") {
            setPasswordError(true);
            return true;
        } else {
            setPasswordError(false);
            return false;
        }
    };

    const handleChangeUsername = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setUsername(e.target.value);
        validateUsername(e.target.value);
    };

    const handleChangePassword = (e: {
        target: { value: SetStateAction<string> };
    }) => {
        setPassword(e.target.value);
        validatePassword(e.target.value);
    };

    const processLogin = async () => {
        try {
            const response = await apiClient.post("/user/login", {
                euname: username,
                password,
            });
            const { hostcodeAccessToken } = response.data;
            return {
                hostcodeAccessToken,
                status: true,
            };
        } catch (error: unknown) {
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

    const handleLogin = async () => {
        console.log("Processing login");
        if (validateUsername(username) || validatePassword(password)) {
            console.log("Inside if");
            return;
        }
        console.log("after if");
        setIsLoginProcessing(true);
        // call api to backend
        const loginStatus = await processLogin();
        const { status, hostcodeAccessToken } = loginStatus;
        if (status) {
            // set cookie
            Cookies.set("HOSTCODE_ACCESS_TOKEN", hostcodeAccessToken);
            dispatch(setToken());
            navigate("/contests");
        } else {
            setIsLoginProcessing(false);
            setLoginErrorMessage(loginStatus.message);
        }
    };

    console.log("rendering");

    return (
        <div className="h-full flex flex-col justify-center w-full max-w-2xl items-center">
            {/* login container */}
            <div className="rounded-md shadow-xl p-5 mb-30 w-8/10 max-w-md">
                {/* header container */}
                <div className="flex mb-5">
                    <h1 className="text-2xl font-bold">
                        Welcome back,
                        <br />
                        Login to HOSTCODE
                    </h1>
                </div>
                {/* Username container */}
                <div className="mb-3">
                    <div className="flex items-center bg-gray-100 bg-opacity-80 p-2 rounded-md">
                        <label className="text-xl">
                            <FaCircleUser />
                        </label>
                        <input
                            type="text"
                            value={username}
                            placeholder="Username or Email"
                            className="ml-3 flex-grow text-sm focus:outline-none"
                            onChange={handleChangeUsername}
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {usernameError && "* username or email is required"}
                    </p>
                </div>
                {/* password container */}
                <div className="mb-3">
                    <div className="flex items-center bg-gray-100 bg-opacity-80 p-2 rounded-md">
                        <label className="text-xl">
                            <FaLock />
                        </label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Password"
                            className="ml-3 flex-grow text-sm focus:outline-none"
                            onChange={handleChangePassword}
                        />
                        {password !== "" && (
                            <button
                                className="mr-1"
                                onClick={() =>
                                    setShowPassword((prevState) => !prevState)
                                }
                            >
                                {showPassword ? (
                                    <FaRegEyeSlash />
                                ) : (
                                    <FaRegEye />
                                )}
                            </button>
                        )}
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {passwordError && "* password is required"}
                    </p>
                </div>
                {/* login button container */}
                <div className="mb-3">
                    <div>
                        <button
                            onClick={handleLogin}
                            disabled={isLoginProcessing}
                            className={`w-full bg-blue-500 py-2 rounded-md text-white hover:bg-blue-600 ${isLoginProcessing ? "cursor-not-allowed hover:bg-gray-300 bg-gray-300 text-gray-500" : "cursor-pointer"}`}
                        >
                            Login
                        </button>
                    </div>
                    <p className="text-xs text-red-600 text-center ml-3">
                        {loginErrorMessage}
                    </p>
                </div>
                <div className="mb-3 flex items-center justify-around text-gray-300 text-sm">
                    <div className="w-2/5">
                        <hr className="" />
                    </div>
                    <div>
                        <p>or</p>
                    </div>
                    <div className="w-2/5">
                        <hr className="" />
                    </div>
                </div>
                <div className="mb-3">
                    <button className="w-full py-2 rounded-md flex items-center justify-center border border-gray-400 hover:cursor-pointer hover:bg-gray-100">
                        <FcGoogle className="mr-2 text-xl" />
                        Sign in with Google
                    </button>
                </div>
                <div className="text-center text-sm text-gray-400">
                    <p>
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-800 underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
