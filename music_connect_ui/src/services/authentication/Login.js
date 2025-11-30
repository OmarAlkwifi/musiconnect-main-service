import './Login.css';
import musicConnectLogo from '../../files/music-connect-logo.png';
import spotifyLogo from '../../files/spotify-logo.png';
import youTubeMusicLogo from '../../files/youtube-music-logo.png';
import Header from '../../components/Header';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import { Alert, Button, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const LoginPage = ({ type }) => {
    const navigate = useNavigate();
    const { login, authenticated, getRememberedCredentials } = useAuth();

    const [logo, setLogo] = useState(musicConnectLogo);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [colour, setColour] = useState("#20B654");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (type === "spotify") {
            setLogo(spotifyLogo);
            setColour("#1ED760");
        } else if (type === "youtube-music") {
            setLogo(youTubeMusicLogo);
            setColour("#FF0000");
        } else {
            setLogo(musicConnectLogo);
            setColour("#20B654");
        }
    }, [type]);

    // Load remembered credentials on mount
    useEffect(() => {
        if (type === "music-connect") {
            const remembered = getRememberedCredentials();
            if (remembered.hasRemembered) {
                setUsername(remembered.username);
                setPassword(remembered.password);
                setRememberMe(true);
            }
        }
    }, [type, getRememberedCredentials]);

    const authenticate = async () => {
        setLoading(true);
        setError(false);
        setErrorMessage("");

        // Validation
        if (!username || !password) {
            setError(true);
            setErrorMessage("Username and password are required");
            setLoading(false);
            return;
        }

        if (type === "music-connect") {
       
            const result = await login(username, password, rememberMe);

            if (result.success) {
               
                navigate("/");
            } else {
                setError(true);
                setErrorMessage(result.error || "Login failed. Please try again.");
            }
        } else {
           
            console.log(`Authenticating with ${type}`);
         
        }

        setLoading(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            authenticate();
        }
    };

    return (
        <div>
            {type !== "music-connect" ? <Header /> : <></>}
            <div className="auth-container">
                <img className={"logo"} src={logo} alt={`${type} Logo`} />
                <div className={"auth-wrapper"}>
                    <div className={"username-container"}>
                        <p className={"username-label"}>Username:</p>
                        <TextField 
                            hiddenLabel 
                            id="username-field" 
                            size="small" 
                            placeholder={"Username"} 
                            value={username}
                            sx={{ width: '80%' }} 
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                    <div className={"password-container"}>
                        <p className={"password-label"}>Password:</p>
                        <div className={"password-label"}></div>
                        <TextField 
                            hiddenLabel 
                            id="password-field" 
                            size="small" 
                            type={"password"} 
                            placeholder={"Password"} 
                            value={password}
                            sx={{ width: '80%' }} 
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />
                    </div>
                    {type === "music-connect" && (
                        <div style={{ marginTop: '10px', textAlign: 'left', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        sx={{
                                            color: colour,
                                            '&.Mui-checked': {
                                                color: colour,
                                            },
                                        }}
                                    />
                                }
                                label="Remember Me"
                            />
                        </div>
                    )}
                    {type === "music-connect" && (
                        <div style={{ marginTop: '5px', textAlign: 'center' }}>
                            <a 
                                href="/forgot-password" 
                                style={{ 
                                    color: colour, 
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}
                            >
                                Forgot Password?
                            </a>
                        </div>
                    )}
                </div>
                <div className={"auth-footer"}>
                    {type === "music-connect" ? (
                        <p className={"create-account"}>
                            Don't have an account? <a href={'/create-account'}>Create Account</a>
                        </p>
                    ) : <></>}
                    {error ? (
                        <Alert severity="error" sx={{ marginBottom: '10px' }}>
                            {errorMessage}
                        </Alert>
                    ) : null}
                    {type !== "music-connect" ? (
                        <Button 
                            className={"stay-unauthenticated"} 
                            variant="contained" 
                            sx={{ backgroundColor: "black", color: "white", width: "100px" }} 
                            onClick={() => {
                                type === "spotify" ? navigate("/spotify") : navigate("/youtube-music")
                            }}
                        >
                            Stay Unauthenticated
                        </Button>
                    ) : null}
                    <Button 
                        className={"login-button"} 
                        variant="contained" 
                        disabled={loading}
                        sx={{ 
                            backgroundColor: colour, 
                            color: "white", 
                            width: "100px" 
                        }} 
                        onClick={authenticate}
                    >
                        {loading ? "Loading..." : "Login"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;