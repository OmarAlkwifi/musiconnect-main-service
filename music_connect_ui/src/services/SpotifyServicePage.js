import "./SpotifyServicePage.css";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpotify} from "@fortawesome/free-brands-svg-icons";
import Badge from "@mui/material/Badge";
import {faPlusCircle, faUserCircle} from "@fortawesome/free-solid-svg-icons";
import {Button, IconButton, Tooltip} from "@mui/material";
import {useNavigate} from "react-router";

const SpotifyServicePage = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const createPlaylist = () => {

    };

    const handleSearch = () => {
        // call searchslice and open search page with type YouTube Music
    };

    return (
        <div className="spotify-service-page">
            <Header />
            <div className="service-content">
                <FontAwesomeIcon icon={faSpotify} size="3x" color="#1ED760" />
                <SearchBar service="Spotify" onSearch={handleSearch}/>
                <div className="user-profile">
                    <Badge variant="dot" color={isLoggedIn ? "success" : "error"}>
                        <FontAwesomeIcon icon={faUserCircle} size="2x" />
                    </Badge>
                    {isLoggedIn ? <p className={"account-connected"}>Account Connected</p> : null}
                </div>
            </div>
            {!isLoggedIn ? <Button onClick={() => navigate("/spotify/login")} sx={{ color: "#1ED760", background: "#FAFAFA" }}>Connect Spotify Account</Button> : null }
            <div className={"playlists"}>
                <div className={"playlist-header"}>
                    <h2 className={"playlist-title"}>My Playlists</h2>
                    {isLoggedIn ? <Tooltip title="Create New Playlist" placement="top-end">
                        <IconButton onClick={createPlaylist}>
                            <FontAwesomeIcon icon={faPlusCircle} color="#1ED760" />
                        </IconButton>
                    </Tooltip> : null }
                </div>
                <div className={"playlists-container"}>
                    {/* for each playlist create new PlaylistItem using data from api*/}
                    { !isLoggedIn ? <p className="playlist-unauthenticated">Sign into Spotify to see user playlists.</p> : null }
                </div>
            </div>
        </div>
    );
};

export default SpotifyServicePage;