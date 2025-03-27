import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import apiClient from "../API/apiClient";
import { AxiosError } from "axios";

interface FormData {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    mobile: number | string;
    organization: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
    mobile: string;
    organization: string;
    password: string;
    confirmPassword: string;
}

function Signup() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        mobile: "",
        organization: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState<FormErrors>({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        mobile: "",
        organization: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isSignupSuccess, setIsSignupSuccess] = useState(false);
    const [signupError, setSignupError] = useState("");
    const [isSignupProcessing, setIsSignupProcessing] = useState(false);

    const validateUserName = () => {
        const { username } = formData;
        if (username.trim() === "") {
            setErrors((prevState) => ({
                ...prevState,
                username: "Username is requried",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, username: "" }));
            return false;
        }
    };

    const validateFirstName = () => {
        const { firstName } = formData;
        if (firstName.trim() === "") {
            setErrors((prevState) => ({
                ...prevState,
                firstName: "First name is required",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, firstName: "" }));
            return false;
        }
    };

    const validateLastName = () => {
        const { lastName } = formData;
        if (lastName.trim() === "") {
            setErrors((prevState) => ({
                ...prevState,
                lastName: "Last name is required",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, lastName: "" }));
            return false;
        }
    };

    const validateEmail = () => {
        const { email } = formData;
        if (email.trim() === "") {
            setErrors((prevState) => ({
                ...prevState,
                email: "Email is required",
            }));
            return true;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setErrors((prevState) => ({
                ...prevState,
                email: "Invalid Email",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, email: "" }));
            return false;
        }
    };

    const validateDateOfBirth = () => {
        const { dateOfBirth } = formData;
        if (!dateOfBirth) {
            setErrors((prevState) => ({
                ...prevState,
                dateOfBirth: "Date of birth is required",
            }));
            return true;
        } else {
            const today = new Date();
            const birthDate = new Date(dateOfBirth);
            if (birthDate > today) {
                setErrors((prevState) => ({
                    ...prevState,
                    dateOfBirth: "Date of birth cannot be in the future",
                }));
                return true;
            } else {
                setErrors((prevState) => ({ ...prevState, dateOfBirth: "" }));
                return false;
            }
        }
    };

    const validateMobile = () => {
        const { mobile } = formData;
        if (!mobile) {
            setErrors((prevState) => ({
                ...prevState,
                mobile: "Mobile number is required",
            }));
            return true;
        } else if (!/^\d{10}$/.test(mobile.toString())) {
            setErrors((prevState) => ({
                ...prevState,
                mobile: "Mobile number must be 10 digits",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, mobile: "" }));
            return false;
        }
    };

    const validateOrganization = () => {
        const { organization } = formData;
        if (organization.trim() === "") {
            setErrors((prevState) => ({
                ...prevState,
                organization: "Organization is required",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, organization: "" }));
            return false;
        }
    };

    const validatePassword = () => {
        const { password } = formData;
        if (password.trim() === "") {
            setErrors((prevState) => ({
                ...prevState,
                password: "Password is required",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, password: "" }));
            return false;
        }
    };

    const validateConfirmPassword = () => {
        const { password, confirmPassword } = formData;
        if (confirmPassword.trim() === "") {
            setErrors((prevState) => ({
                ...prevState,
                confirmPassword: "Confirm password is required",
            }));
            return true;
        } else if (password !== confirmPassword) {
            setErrors((prevState) => ({
                ...prevState,
                confirmPassword: "Passwords do not match",
            }));
            return true;
        } else {
            setErrors((prevState) => ({ ...prevState, confirmPassword: "" }));
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (value === "") {
            setErrors((prevState) => ({
                ...prevState,
                [name]: "This field is required",
            }));
        } else {
            setErrors((prevState) => ({
                ...prevState,
                [name]: "",
            }));
        }
    };
    const processSignup = async () => {
        try {
            const {
                username,
                firstName,
                lastName,
                dateOfBirth,
                password,
                mobile,
                email,
                organization,
            } = formData;
            const response = await apiClient.post("/user/register", {
                username,
                firstName,
                lastName,
                password,
                mobile,
                email,
                organization,
                dob: dateOfBirth,
            });
            console.log(response.data);
            return {
                status: true,
                message: response.data.message,
            };
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                // eslint-disable-next-line no-unsafe-optional-chaining
                const { message } = error.response?.data;
                return {
                    status: false,
                    message,
                };
            } else {
                return {
                    status: false,
                    message: "Unknown Error, Please try again after sometime",
                };
            }
        }
    };
    const handleSubmit = async () => {
        if (
            validateUserName() ||
            validateFirstName() ||
            validateLastName() ||
            validatePassword() ||
            validateConfirmPassword() ||
            validateDateOfBirth() ||
            validateEmail() ||
            validateMobile() ||
            validateOrganization()
        ) {
            return;
        }
        // Call API to register the user
        console.log("Processing Sign up");
        setIsSignupProcessing(true);
        const { status, message } = await processSignup();
        if (status) {
            setIsSignupSuccess(true);
        } else {
            setSignupError(message);
        }
        setIsSignupProcessing(false);
    };

    console.log("Rendering");
    console.log(formData);

    return isSignupSuccess ? (
        <div className="h-full w-full flex justify-center items-center">
            <div>
                <h1 className="text-xl md:text-3xl">
                    You have been{" "}
                    <span className="text-green-500">successfully</span>
                    <br className="md:hidden" /> registered with{" "}
                    <span className="font-mono text-2xl md:text-4xl">
                        HOST
                        <span className="text-blue-600 font-bold">CODE</span>
                    </span>
                </h1>
                <p className="text-center">
                    <Link to="/login" className="text-blue-600 underline">
                        Click here
                    </Link>{" "}
                    to login
                </p>
            </div>
        </div>
    ) : (
        <div className="h-full flex flex-col justify-center w-full max-w-2xl items-center">
            <div className="rounded-md shadow-xl p-5 w-8/10 max-w-md">
                <div className="text-2xl font-bold mb-3 text-center">
                    <h1>Signup for HOSTCODE</h1>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Username</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2">
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className="w-full text-sm focus:outline-none"
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {errors.username}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">First Name</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2">
                        <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            className="w-full text-sm focus:outline-none"
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {errors.firstName}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Last Name</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2">
                        <input
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            className="w-full text-sm focus:outline-none"
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {errors.lastName}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Password</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2 flex">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full text-sm focus:outline-none flex-grow"
                        />
                        {formData.password !== "" && (
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
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Confirm Password</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2 flex">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Renter your password"
                            className="w-full text-sm focus:outline-none flex-grow"
                        />
                        {formData.password !== "" && (
                            <button
                                className="mr-1"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        (prevState) => !prevState,
                                    )
                                }
                            >
                                {showConfirmPassword ? (
                                    <FaRegEyeSlash />
                                ) : (
                                    <FaRegEye />
                                )}
                            </button>
                        )}
                    </div>
                    <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Email</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2">
                        <input
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full text-sm focus:outline-none"
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {errors.email}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Date of Birth</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2">
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="w-full text-sm focus:outline-none"
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {errors.dateOfBirth}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Mobile</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2">
                        <input
                            name="mobile"
                            type="tel"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            className="w-full text-sm focus:outline-none"
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {errors.mobile}
                    </p>
                </div>
                <div className="mb-3 flex flex-col">
                    <label className="ml-1 text-sm">Organization</label>
                    <div className="bg-gray-100 bg-opacity-80 rounded-md p-2">
                        <input
                            name="organization"
                            type="text"
                            value={formData.organization}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            className="w-full text-sm focus:outline-none"
                        />
                    </div>
                    <p className="text-xs text-red-600 text-left ml-3">
                        {errors.organization}
                    </p>
                </div>
                <button
                    type="submit"
                    disabled={isSignupProcessing}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
                    onClick={handleSubmit}
                >
                    Sign Up
                </button>
                <p className="w-full text-xs text-red-600 text-center">
                    {signupError}
                </p>
            </div>
        </div>
    );
}

export default Signup;
