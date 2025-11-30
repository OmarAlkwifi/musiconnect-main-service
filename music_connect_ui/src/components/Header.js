import "./Header.css";
import musicConnectLogo from '../files/music-connect-logo.png';
import {Button, ButtonGroup} from "@mui/material";

const Header = () => {

    const handleLogout = async () => {
        // call UserSlice logout
    }

    return (
        <div className={"header-container"} aria-labelledby="header-container">
            <a href={'/'}><img src={musicConnectLogo} className={"logo"} alt={"MusicConnect Logo"}/></a>
            <ButtonGroup variant="text" sx={{ borderColor: "#20B654" }}>
                <Button sx={{ color: "#20B654" }} onClick={handleLogout}>Logout</Button>
            </ButtonGroup>
        </div>
    );
}

export default Header;