import './PlaylistMigrationServicePage.css';
import Header from "../components/Header";
import {useState} from "react";
import PlaylistDropdown from "../components/PlaylistDropdown";
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {useSelector} from "react-redux";
import {selectSpotifyPlaylists} from "../slices/SpotifySlice.ts";

const PlaylistMigrationServicePage = () => {
    const spotifyPlaylists = useSelector(selectSpotifyPlaylists);
    const youTubeMusicPlaylists = useSelector(() => null); //TODO
    const [playlists, setPlaylists] = useState([]);
    const services = ["Spotify", "YouTube Music"];
    const [selectedSource, setSelectedSource] = useState("");
    const [selectedDestination, setSelectedDestination] = useState("");

    const handleServiceChange = (value, type) => {
        if (type === "source") {
            setSelectedSource(value);
            setPlaylists(value === "Spotify" ? spotifyPlaylists : youTubeMusicPlaylists);
            if (selectedDestination === value) {
                setSelectedDestination("");
            }
        }
        else {
            setSelectedDestination(value);
            if (selectedSource === value) {
                setSelectedSource("");
                setPlaylists([]);
            }
        }
    };

    return (
        <div className="playlist-migration-service-page">
            <Header />
            <div className={"playlist-service"}>
                <div className={"playlist-source"}>
                    <PlaylistDropdown listItems={services} label={"Source"} selectedService={selectedSource} handleServiceChange={(newValue) => handleServiceChange(newValue, "source")}/>
                </div>
                <div className={"playlist-destination"}>
                    <PlaylistDropdown listItems={services} label={"Destination"} selectedService={selectedDestination} handleServiceChange={(newValue) => handleServiceChange(newValue, "destination")}/>
                </div>
            </div>
            <div className={"source-playlists"}>
                <List dense>
                    {playlists.map((playlist) => (
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt={"playlist.name"} src="playlist-img-url" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={"playlist.name"}
                                secondary={"playlist.artist"}
                            />
                        </ListItem>
                    ))}
                </List>
            </div>
        </div>
    );
};

export default PlaylistMigrationServicePage;