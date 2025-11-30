import "./PlaylistItem.css";

const PlaylistItem = ({playlistName, playlistImage}) => {
    return (
        <div className="PlaylistItem">
            <img className={playlistName} alt={`${playlistName} album cover`} src={playlistImage} />
            <h3>{playlistName}</h3>
        </div>
    );
}

export default PlaylistItem;