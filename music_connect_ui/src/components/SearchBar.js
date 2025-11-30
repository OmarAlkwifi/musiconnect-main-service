import "./SearchBar.css";
import {useState} from "react";
import TextField from "@mui/material/TextField";
import {IconButton, InputAdornment} from "@mui/material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from "react-router";

const SearchBar = ({service="MusicConnect", q}) => {
    const navigate = useNavigate();
    const [query, setQuery] = useState(q ?? "");
    const handleSearch = () => {
        navigate(`/search?q=${query}&sid=${service}`);
    };

    return (
        <div className="SearchBar">
            <TextField className={"search-bar"} placeholder={`Search ${service}`} defaultValue={query} variant="outlined" sx={{ width: "800px", padding: "1px" }}  onChange={(e) => setQuery(e.target.value)} slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearch}>
                                <FontAwesomeIcon icon={faSearch} size={"sm"}/>
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}/>
        </div>
    );
};

export default SearchBar;