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
        <p>{api.info}</p>
      </div>
      <a
        href={api.documentation[0].url}
        className="cards-api-documentation-link"
      >
        <p>Official Documentation</p>
      </a>
    </div>
  );
};

export default APIinfoCard;
