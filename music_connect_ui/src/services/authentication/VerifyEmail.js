import './VerifyEmail.css';
import musicConnectLogo from '../../files/music-connect-logo.png';
import { useState, useEffect } from "react";
import { Alert, Button, CircularProgress } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const VerifyEmailPage = () => {
    const navigate = useNavigate();
    const { verifyEmail } = useAuth();
    const [searchParams] = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const verificationToken = searchParams.get('token');
        
        if (!verificationToken) {
            setError(true);
            setMessage("Invalid or missing verification token.");
            setLoading(false);
            return;
        }

        handleVerification(verificationToken);
    }, [searchParams]);

    const handleVerification = async (verificationToken) => {
        const result = await verifyEmail(verificationToken);

        if (result.success) {
            setSuccess(true);
            setMessage(result.message || "Email verified successfully! Redirecting to login...");
            setTimeout(() => navigate("/music-connect/login"), 3000);
        } else {
            setError(true);
            setMessage(result.error || "Email verification failed. The token may be expired.");
        }

        setLoading(false);
    };

    return (
        <div>
            <div className="auth-container">
                <img className={"logo"} src={musicConnectLogo} alt={`MusicConnect Logo`} />
                
                <h2 style={{ color: '#20B654', marginBottom: '10px' }}>
                    Email Verification
                </h2>

                <div className={"auth-wrapper"} style={{ minHeight: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {loading ? (
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress style={{ color: '#20B654' }} />
                            <p style={{ marginTop: '20px', color: '#666' }}>Verifying your email...</p>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', width: '100%' }}>
                            {message !== "" && (
                                <Alert severity={error ? "error" : "success"} sx={{ marginBottom: '20px' }}>
                                    {message}
                                </Alert>
                            )}
                            
                            {success && (
                                <p style={{ color: '#666', fontSize: '14px' }}>
                                    You can now log in with your credentials.
                                </p>
                            )}

                            {error && (
                                <Button 
                                    variant="contained" 
                                    sx={{ 
                                        backgroundColor: "#20B654", 
                                        color: "white",
                                        marginTop: '10px'
                                    }} 
                                    onClick={() => navigate("/music-connect/login")}
                                >
                                    Go to Login
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VerifyEmailPage;