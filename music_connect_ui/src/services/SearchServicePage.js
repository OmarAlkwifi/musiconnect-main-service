import "./SearchServicePage.css";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import {Button, Divider} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router";
import {useEffect, useState} from "react";

const SearchServicePage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
    const [resultCount, setResultCount] = useState(0);

    const serviceId = searchParams.get("sid");
    let serviceURL;
    useEffect(() => {
        if (serviceId === "MusicConnect"){
            serviceURL = "/music-connect";
        }
        else if (serviceId === "Spotify"){
            serviceURL = "/spotify";
        }
        else {
            serviceURL = "/youtube-music";
        }
    }, [serviceId]);

    const handleSearch = () => {

    };

    return (
        <div className="search-service-page">
            <Header />
            <div className="search-header">
                <Button className="back-button" onClick={() => navigate(serviceURL)} >Back</Button>
                <SearchBar service={serviceId} q={searchQuery}/>
            </div>
            <div className="search-results">
                <p className="result-count">{resultCount} Results</p>
                <Divider fullWidth />
                {/* For each result map result to SearchResult Component */}
            </div>
        </div>
    );
};

export default SearchServicePage;