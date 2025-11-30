import "./ServiceButton.css";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Card} from "@mui/material";

const ServiceButton = ({service, serviceURL, icon, colour, onClick}) => {
    const handleClick = (e) => {
        if (onClick) {
            e.preventDefault();
            onClick();
        }
        
    };

    return (
        <Card className="ServiceButton" component="section">
            <a className={service} href={serviceURL} onClick={handleClick}>
                <FontAwesomeIcon icon={icon} size="5x" color={colour}/>
                <h3 style={{ color: "black" }}>{service}</h3>
            </a>
        </Card>
    );
};

export default ServiceButton;