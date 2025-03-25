import { useState } from "react";

function Signup() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [dob, setDob] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");

    // Define type for event handler
    type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

    // Event handlers with simplified typing
    // const handleChangeUsername = (e: ChangeEvent) => setUsername(e.target.value);
    // const handleChangeFirstname = (e: ChangeEvent) => setFirstname(e.target.value);
    // const handleChangeLastname = (e: ChangeEvent) => setLastname(e.target.value);
    // const handleChangeDob = (e: ChangeEvent) => setDob(e.target.value);
    // const handleChangePassword = (e: ChangeEvent) => setPassword(e.target.value);
    // const handleChangeConfirmPassword = (e: ChangeEvent) => setConfirmPassword(e.target.value);
    // const handleChangeMobile = (e: ChangeEvent) => setMobile(e.target.value);
    // const handleChangeEmail = (e: ChangeEvent) => setEmail(e.target.value);
    // const handleChangeOrganization = (e: ChangeEvent) => setOrganization(e.target.value);

    // Validation states
    const [errors, setErrors] = useState({
        username: "",
        firstname: "",
        lastname: "",
        dob: "",
        password: "",
        confirmPassword: "",
        mobile: "",
        email: "",
        organization: ""
    });

    // Validation function
    const validateInput = (name: string, value: string) => {
        switch (name) {
            case "username":
                if (value.length < 3) return "Username must be at least 3 characters";
                break;
            case "firstname":
            case "lastname":
                if (value.length < 2) return "Must be at least 2 characters";
                break;
            case "dob":
                if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "Use YYYY-MM-DD format";
                break;
            case "password":
                if (value.length < 8) return "Password must be at least 8 characters";
                break;
            case "confirmPassword":
                if (value !== password) return "Passwords must match";
                break;
            case "mobile":
                if (!/^\d{10}$/.test(value)) return "Enter a valid 10-digit number";
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email";
                break;
            case "organization":
                if (value.length < 2) return "Must be at least 2 characters";
                break;
        }
        return "";
    };

    // Handle input change with validation
    const handleInputChange = (e: ChangeEvent) => {
        const { name, value } = e.target;
        const error = validateInput(name, value);

        setErrors(prev => ({ ...prev, [name]: error }));

        switch (name) {
            case "username": setUsername(value); break;
            case "firstname": setFirstname(value); break;
            case "lastname": setLastname(value); break;
            case "dob": setDob(value); break;
            case "password": setPassword(value); break;
            case "confirmPassword": setConfirmPassword(value); break;
            case "mobile": setMobile(value); break;
            case "email": setEmail(value); break;
            case "organization": setOrganization(value); break;
        }
    };

    return (
        <div className="h-full flex flex-col justify-center w-full max-w-2xl items-center">
            <div className="rounded-md shadow-xl p-5 mb-30 w-8/10 max-w-md">
                <div className="flex">
                    <h1 className="text-2xl font-bold">
                        Welcome,
                        <br />
                        Signup for HOSTCODE
                    </h1>
                </div>
                <div>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={handleInputChange}
                        />
                        {errors.username && <p className="text-red-500">{errors.username}</p>}
                    </div>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstname"
                            value={firstname}
                            onChange={handleInputChange}
                        />
                        {errors.firstname && <p className="text-red-500">{errors.firstname}</p>}
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastname"
                            value={lastname}
                            onChange={handleInputChange}
                        />
                        {errors.lastname && <p className="text-red-500">{errors.lastname}</p>}
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <input
                            type="text"
                            name="dob"
                            value={dob}
                            onChange={handleInputChange}
                            placeholder="YYYY-MM-DD"
                        />
                        {errors.dob && <p className="text-red-500">{errors.dob}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleInputChange}
                        />
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleInputChange}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500">{errors.confirmPassword}</p>
                        )}
                    </div>
                    <div>
                        <label>Mobile</label>
                        <input
                            type="text"
                            name="mobile"
                            value={mobile}
                            onChange={handleInputChange}
                        />
                        {errors.mobile && <p className="text-red-500">{errors.mobile}</p>}
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                        />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    </div>
                    <div>
                        <label>Organization</label>
                        <input
                            type="text"
                            name="organization"
                            value={organization}
                            onChange={handleInputChange}
                        />
                        {errors.organization && (
                            <p className="text-red-500">{errors.organization}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;