import "./YouTubeMusicServicePage.css";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { useState } from "react";
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {faPlusCircle, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, IconButton, Tooltip} from "@mui/material";
import {useNavigate} from "react-router";

const YouTubeMusicServicePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const createPlaylist = () => {

    };

    const handleSearch = () => {
        // call searchslice and open search page with type YouTube Music
    };

    return (
        <div className="youtube-service-page">
            <Header />
            <div className="service-content">
                <FontAwesomeIcon icon={faYoutube} size="3x" color="red" />
                <SearchBar service="YouTube Music" onSearch={handleSearch}/>
                <div className="user-profile">
                    <Badge variant="dot" color={isLoggedIn ? "success" : "error"}>
                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                    </Badge>
                    {isLoggedIn ? <p className={"account-connected"}>Account Connected</p> : null}
                </div>
            </div>
            {!isLoggedIn ? <Button onClick={() => navigate("/youtube-music/login")} sx={{ color: "red", background: "#FAFAFA" }}>Connect YouTube Music Account</Button> : null }
            <div className={"playlists"}>
                <div className={"playlist-header"}>
                    <h2 className={"playlist-title"}>My Playlists</h2>
                    {isLoggedIn ? <Tooltip title="Create New Playlist" placement="top-end">
                        <IconButton onClick={createPlaylist}>
                            <FontAwesomeIcon icon={faPlusCircle} color="red" />
                        </IconButton>
                    </Tooltip> : null }
                </div>
                <div className={"playlists-container"}>
                    {!isLoggedIn ? <p className="playlist-unauthenticated">Sign into YouTube Music to see user playlists.</p> : null}
                    {/* for each playlist create new PlaylistItem using data from api*/}
                </div>
            </div>
        </div>
    );
};

export default YouTubeMusicServicePage;