import './CreateAccount.css';
import musicConnectLogo from '../../files/music-connect-logo.png';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const CreateAccountPage = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [message, setMessage] = useState("");

    const createAccount = async () => {
        setLoading(true);
        setError(false);
        setMessage("");

        // Validation
        if (username.length < 1) {
            setError(true);
            setMessage("Username must be at least 1 character in length.");
            setLoading(false);
            return;
        }

        if (password.length < 8) {
            setError(true);
            setMessage("Password must be at least 8 characters in length.");
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError(true);
            setMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (!email || !email.includes('@')) {
            setError(true);
            setMessage("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        // Call backend to create account
        const result = await register(username, email, password, fullName);

        if (result.success) {
            setError(false);
            setMessage("Account created! Please check your email to verify your account before logging in.");
            setTimeout(() => navigate("/music-connect/login"), 4000);
        } else {
            setError(true);
            setMessage(result.error || "There was a problem creating your account. Please try again.");
        }

        setLoading(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            createAccount();
        }
    };

    return (
        <div>
            <div className="auth-container">
                <img className={"logo"} src={musicConnectLogo} alt={`MusicConnect Logo`} />
                <div className={"auth-wrapper"}>
                    <div className={"username-container"}>
                        <p className={"username-label"}>Username:</p>
                        <TextField 
                            hiddenLabel 
                            id="username-field" 
                            size="small" 
                            placeholder={"Username"} 
                            sx={{ width: '60%' }} 
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                    <div className={"username-container"}>
                        <p className={"username-label"}>Email:</p>
                        <TextField 
                            hiddenLabel 
                            id="email-field" 
                            size="small" 
                            type="email"
                            placeholder={"email@example.com"} 
                            sx={{ width: '60%' }} 
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                    <div className={"username-container"}>
                        <p className={"username-label"}>Full Name (Optional):</p>
                        <TextField 
                            hiddenLabel 
                            id="fullname-field" 
                            size="small" 
                            placeholder={"John Doe"} 
                            sx={{ width: '60%' }} 
                            onChange={(e) => setFullName(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                    <div className={"password-container"}>
                        <p className={"password-label"}>Password:</p>
                        <TextField 
                            hiddenLabel 
                            id="password-field" 
                            size="small" 
                            type={"password"} 
                            placeholder={"Password (min 8 characters)"} 
                            sx={{ width: '60%' }} 
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                    <div className={"password-container"}>
                        <p className={"password-label"}>Confirm Password:</p>
                        <TextField 
                            hiddenLabel 
                            id="confirm-password-field" 
                            size="small" 
                            type={"password"} 
                            placeholder={"Confirm Password"} 
                            sx={{ width: '60%' }} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className={"auth-footer"}>
                    <p className={"create-account"}>
                        Already have an account? <a href={'/music-connect/login'}>Login</a>
                    </p>
                    {message !== "" ? (
                        <Alert severity={error ? "error" : "success"} sx={{ marginBottom: '10px' }}>
                            {message}
                        </Alert>
                    ) : null}
                    <Button 
                        className={"create-account-button"} 
                        variant="contained" 
                        disabled={loading}
                        sx={{ 
                            backgroundColor: "#20B654", 
                            color: "white", 
                            width: "100px" 
                        }} 
                        onClick={createAccount}
                    >
                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CreateAccountPage;