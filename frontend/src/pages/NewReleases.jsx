import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Charts/Table.jsx";

const limit = 10;

const NewReleases = () => {
  // const [fullNewReleases, setFullNewReleases] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [renderCountPosition, setRenderCountPosition] = useState(limit);
  const [error, setError] = useState(null);

  const fetchFeaturedCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/steam/featuredcategories");
      const newReleases = response.data.new_releases.items;
      setNewReleases(newReleases);
      console.log("New Releases: ", newReleases);

      // Information we want
      // id, name, large small header images, price_overview, release_date, ratings
      const data = await Promise.all(
        newReleases.map(async (game) => {
          const appData = await axios.get(
            `/api/steam/appdetails?appids=${game.id}`
          );

          return {
            id: game.id,
            name: game.name,
            img_large: game.large_capsule_image,
            img_small: game.small_capsule_image,
            img_header: game.header_image,
            price_final: game.final_price / 100,
            dejus_ratings: appData.data[game.id].data.ratings.dejus,
            release_date: appData.data[game.id].data.release_date.date,
          };
        })
      );
      console.log(data);
      setNewReleases(data);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching featured games on steam: ", e);
      setError(
        `Error ${e.status}: fetching featured games on steam, this may be due to constant refreshses to our API's. Please wait a few minutes to regain access. If you think this is a mistake on our end, please contact us below.`
      );
    }
  };

  // Load all featured categories
  useEffect(() => {
    fetchFeaturedCategories();
  }, []);

  return (
    <div>
      <h1>New Releases</h1>

      {/* display table here */}
      <div>
        {loading && !error && <p>loading entries...</p>}
        {error && `${error}`}
        {!loading && !error && <Table data={newReleases} limit={limit} />}
      </div>
    </div>
  );
};

export default NewReleases;
