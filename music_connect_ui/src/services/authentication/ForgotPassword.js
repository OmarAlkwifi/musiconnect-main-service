import './ForgotPassword.css';
import musicConnectLogo from '../../files/music-connect-logo.png';
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const { forgotPassword } = useAuth();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setMessage("");

        if (!email || !email.includes('@')) {
            setError(true);
            setMessage("Please enter a valid email address.");
            setLoading(false);
            return;
        }

        const result = await forgotPassword(email);

        if (result.success) {
            setSuccess(true);
            setMessage(result.message || "If the email exists, a password reset link has been sent.");
        } else {
            setError(true);
            setMessage(result.error || "Failed to send reset email. Please try again.");
        }

        setLoading(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div>
            <div className="auth-container">
                <img className={"logo"} src={musicConnectLogo} alt={`MusicConnect Logo`} />
                
                <h2 style={{ color: '#20B654', marginBottom: '10px' }}>Forgot Password?</h2>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    Enter your email address and we'll send you a link to reset your password.
                </p>

                <div className={"auth-wrapper"}>
                    <div className={"username-container"}>
                        <p className={"username-label"}>Email Address:</p>
                        <TextField 
                            hiddenLabel 
                            id="email-field" 
                            size="small" 
                            type="email"
                            placeholder={"your.email@example.com"} 
                            value={email}
                            sx={{ width: '80%' }} 
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                </div>

                <div className={"auth-footer"}>
                    {message !== "" ? (
                        <Alert severity={error ? "error" : "success"} sx={{ marginBottom: '10px' }}>
                            {message}
                        </Alert>
                    ) : null}

                    <p className={"create-account"}>
                        Remember your password? <a href={'/music-connect/login'}>Back to Login</a>
                    </p>

                    <Button 
                        className={"submit-button"} 
                        variant="contained" 
                        disabled={loading}
                        sx={{ 
                            backgroundColor: "#20B654", 
                            color: "white", 
                            width: "150px" 
                        }} 
                        onClick={handleSubmit}
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;