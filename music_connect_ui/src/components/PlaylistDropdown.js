import "./PlaylistDropdown.css";
import {FormControl, MenuItem, Select} from "@mui/material";


const PlaylistDropdown = ({listItems, label, selectedService, handleServiceChange}) => {

    return (
        <div className={"playlist-dropdown"}>
            <p className={"playlist-label"}>{label}: </p>
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                    labelId="service-label"
                    id="service-name"
                    value={selectedService}
                    onChange={(event) => handleServiceChange(event.target.value)}
                    variant={"standard"}
                    sx={{ m: 1, width: 200, height: 40 }}
                >
                    {listItems.map((item) => (
                        <MenuItem
                            key={item}
                            value={item}
                        >
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default PlaylistDropdown;