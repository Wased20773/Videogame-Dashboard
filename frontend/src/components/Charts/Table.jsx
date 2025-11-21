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
            <th>Thumbnail</th>
            <th className="name">Name</th>
            <th>Release Date</th>
            <th>Price</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(renderCountPosition - limit, renderCountPosition)
            .map((game) => (
              <tr key={game.id} className="table-row">
                <td>
                  <div className="table-img">
                    <img
                      src={game.img_small}
                      width={"auto"}
                      height={50}
                      alt={`thumbnail for ${game.name}`}
                    />
                  </div>
                </td>
                <td className="name">{game.name}</td>
                <td>{game.release_date}</td>
                <td>
                  {game.price_final !== 0 ? `$${game.price_final}` : "Free"}
                </td>
                <td>
                  <div className="table-img">
                    <img
                      src={DJCTQInfo[`${game.dejus_ratings.rating}`].img}
                      height={50}
                      alt={`age rating in DJCTQ for ${game.name}`}
                    />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="table-buttons">
        <button
          className={`table-prev-button ${
            renderCountPosition <= limit && "deactivate-button"
          }`}
          onClick={() => ManageRenderCount("Prev")}
        >
          Prev
        </button>

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
