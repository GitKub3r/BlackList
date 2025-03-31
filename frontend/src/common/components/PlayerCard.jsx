import "../../styles/components/Player-Card.css";
import remove from "../../../public/assets/icons/delete.svg";
import edit from "../../../public/assets/icons/edit.svg";

export const PlayerCard = ({ player }) => {
    const now =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();

    console.log("TODAY: ", now);
    console.log("PLAYER BAN DATE: ", player.duration);

    return (
        <div className="player-card">
            <div className="player-name">
                <h3>{player.username}</h3>
                <p>{player.tag}</p>
            </div>

            <div className="player-ban-info">
                <p>{player.description}</p>
                <p>{player.duration}</p>
                <p>{player.hoster.username}</p>
            </div>

            <div className="player-commands">
                <button className="edit-player-button">
                    <img src={edit} alt="Edit Player Button" />
                </button>
                <button className="remove-player-button">
                    <img src={remove} alt="Remove Player Button" />
                </button>
            </div>
        </div>
    );
};
