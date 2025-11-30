import "./ExportServicePage.css";
import Header from "../components/Header";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel} from "@mui/material";
import {useState} from "react";

const ExportServicePage = () => {
    const [exportCSV, setExportCSV] = useState(true);
    const [exportXML, setExportXML] = useState(false);
    const [exportProp, setExportProp] = useState(false);

    const handleChange = (condition) => {
        // call export slice with export csv, export xml, etc
        if (condition === 'CSV') {
            setExportCSV(!exportCSV);
        }
        else if (condition === 'XML') {
            setExportXML(!exportXML);
        }
    };

    return (
        <div className="export-service-page">
            <Header />
            <div className={"export-service-page-content"}>
                <div className={"export-service-file-type"}>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel>File Format:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={exportCSV} onChange={() => handleChange('CSV')} name="CSV" />
                                }
                                label="CSV"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={exportXML} onChange={() => handleChange('XML')} name="XML" />
                                }
                                label="XML"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
                <div className={"export-service-file-content"}>
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel>File Content:</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={exportProp} onChange={() => handleChange('CSV')} name="Prop 1" />
                                }
                                label="Prop 1"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={exportProp} onChange={() => handleChange('XML')} name="Prop 2" />
                                }
                                label="Prop 2"
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            </div>
        </div>
    );
};

export default ExportServicePage;