import './ResetPassword.css';
import musicConnectLogo from '../../files/music-connect-logo.png';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from "react";
import { Alert, Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const { resetPassword } = useAuth();
    const [searchParams] = useSearchParams();

    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
       
        const resetToken = searchParams.get('token');
        if (resetToken) {
            setToken(resetToken);
        } else {
            setError(true);
            setMessage("Invalid or missing reset token. Please request a new password reset.");
        }
    }, [searchParams]);

    const handleSubmit = async () => {
        setLoading(true);
        setError(false);
        setSuccess(false);
        setMessage("");

        // Validation
        if (!newPassword || newPassword.length < 8) {
            setError(true);
            setMessage("Password must be at least 8 characters long.");
            setLoading(false);
            return;
        }

        if (newPassword !== confirmPassword) {
            setError(true);
            setMessage("Passwords do not match.");
            setLoading(false);
            return;
        }

        if (!token) {
            setError(true);
            setMessage("Invalid reset token. Please request a new password reset.");
            setLoading(false);
            return;
        }

        // Call backend
        const result = await resetPassword(token, newPassword);

        if (result.success) {
            setSuccess(true);
            setMessage(result.message || "Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/music-connect/login"), 3000);
        } else {
            setError(true);
            setMessage(result.error || "Password reset failed. The token may be expired. Please request a new reset.");
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
                
                <h2 style={{ color: '#20B654', marginBottom: '10px' }}>Reset Password</h2>
                <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                    Enter your new password below.
                </p>

                <div className={"auth-wrapper"}>
                    <div className={"password-container"}>
                        <p className={"password-label"}>New Password:</p>
                        <TextField 
                            hiddenLabel 
                            id="new-password-field" 
                            size="small" 
                            type="password"
                            placeholder={"New Password (min 8 characters)"} 
                            value={newPassword}
                            sx={{ width: '80%' }} 
                            onChange={(e) => setNewPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading || !token}
                        />
                    </div>
                    <div className={"password-container"}>
                        <p className={"password-label"}>Confirm Password:</p>
                        <TextField 
                            hiddenLabel 
                            id="confirm-password-field" 
                            size="small" 
                            type="password"
                            placeholder={"Confirm New Password"} 
                            value={confirmPassword}
                            sx={{ width: '80%' }} 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading || !token}
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
                        <a href={'/music-connect/login'}>Back to Login</a>
                    </p>

                    <Button 
                        className={"submit-button"} 
                        variant="contained" 
                        disabled={loading || !token}
                        sx={{ 
                            backgroundColor: "#20B654", 
                            color: "white", 
                            width: "150px" 
                        }} 
                        onClick={handleSubmit}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;