import SteamPNG from "../assets/steam.png";
import IGDBPNG from "../assets/igdb.png";
import "../styles/home.css";

const APIinfoCard = ({ api, theme, width_img }) => {
  return (
    <div className={`cards-api ${theme}`}>
      <div>
        <div className="cards-api-heading">
          <img
            src={api.img}
            width={width_img}
            alt={api.alt}
            style={{ borderRadius: "50%" }}
          />
          <h3 className="cards-api-h3">{api.name}</h3>
        </div>
        <div>{api.info}</div>
      </div>
      <a
        href={api.documentation[0].url}
        className="cards-api-documentation-link"
      >
        Official Documentation
      </a>
    </div>
  );
};

export default APIinfoCard;
