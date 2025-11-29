import { useState } from "react";
import { DJCTQInfo } from "../../assets/data/DJCTQ_RatingInfo.js";
import "../../styles/table.css";

function Table({ data, limit }) {
  const [renderCountPosition, setRenderCountPosition] = useState(limit);

  function ManageRenderCount(direction) {
    setRenderCountPosition((prev) => {
      if (direction === "Prev") {
        const newPos = prev - limit;
        return newPos < limit ? limit : newPos;
      } else {
        const newPos = prev + limit;
        return newPos > data.length ? data.length : newPos;
      }
    });
  }

  return (
    <div>
      <table className="table-container">
        <thead className="table-head">
          <tr>
            <th>
              <p>Thumbnail</p>
            </th>
            <th className="name">
              <p>Name</p>
            </th>
            <th>
              <p>Release Date</p>
            </th>
            <th>
              <p>Price</p>
            </th>
            <th>
              <p>Rating</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(renderCountPosition - limit, renderCountPosition)
            .map((game) => (
              <tr key={game.id} className="table-row">
                <td className="table-image-container">
                  <div className="table-img">
                    <img
                      className="img"
                      src={game.img_small}
                      width={"auto"}
                      height={50}
                      alt={`thumbnail for ${game.name}`}
                    />
                  </div>
                </td>
                <td className="name">
                  <p className="">{game.name}</p>
                </td>
                <td className="date">
                  <p className="">{game.release_date}</p>
                </td>
                <td className="price">
                  <p className="">
                    {game.price_final !== 0 ? `$${game.price_final}` : "Free"}
                  </p>
                </td>
                <td className="table-image-container">
                  <div className="table-img">
                    {game.ratings && game.ratings.dejus ? (
                      <img
                        src={DJCTQInfo[`${game.ratings.dejus.rating}`].img}
                        height={50}
                        alt={`age rating: ${game.ratings.dejus.rating}`}
                      />
                    ) : (
                      <p>N/A</p>
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="table-card-container">
        {data
          .slice(renderCountPosition - limit, renderCountPosition)
          .map((game) => (
            <div key={game.id} className="table-card">
              <div>
                <div>
                  <img
                    className="img"
                    src={game.img_large}
                    height={100}
                    alt={`thumbnail for ${game.name}`}
                  />
                </div>
              </div>
              <div className="table-card-details">
                <div className="name">
                  <p>{game.name}</p>
                </div>
                <div className="date">
                  <p>{game.release_date}</p>
                </div>
                <div className="price">
                  <p>
                    {game.price_final !== 0 ? `$${game.price_final}` : "free"}
                  </p>
                </div>
                <div>
                  {game.ratings && game.ratings.dejus ? (
                    <img
                      className="rating"
                      src={DJCTQInfo[`${game.ratings.dejus.rating}`].img}
                      height={50}
                      alt={`age rating in DJCTQ for ${game.name}`}
                    />
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="table-buttons">
        <button
          className={`table-prev-button ${
            renderCountPosition <= limit && "deactivate-button"
          }`}
          onClick={() => ManageRenderCount("Prev")}
        >
          Prev
        </button>
        <div className="table-index-jump">
          {data.slice(0, data.length / limit).map((_, index) => (
            <button
              className="table-index-jump-btn"
              key={index}
              onClick={() => setRenderCountPosition(limit * (index + 1))}
            >
              {renderCountPosition === limit * (index + 1) ? (
                <p className="table-index-jump-current">{index + 1}</p>
              ) : (
                <p>{index + 1}</p>
              )}
            </button>
          ))}
        </div>
        <button
          className={`table-next-button ${
            renderCountPosition >= data.length && "deactivate-button"
          }`}
          onClick={() => ManageRenderCount("Next")}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Table;
