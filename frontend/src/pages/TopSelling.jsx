import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../components/Charts/Table";
import LoadingData from "../components/LoadingData";

const limit = 10;

const TopSelling = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/steam/featuredcategories");
      const topSellers = response.data.top_sellers.items;

      // Information we want
      // id, name, large and small images, final_price, release_date, ratings
      const data = await Promise.all(
        topSellers.map(async (game) => {
          const appData = await axios.get(
            `/api/steam/appdetails?appids=${game.id}`
          );

          // If Steam returned an invalid response OR it's hardware → skip
          const detail = appData.data?.[game.id]?.data;
          if (!detail || detail.type === "hardware") return null;

          return {
            id: game.id,
            name: game.name,
            img_small: game.small_capsule_image,
            img_large: game.large_capsule_image,
            price_final: game.final_price / 100,
            ratings: appData.data[game.id].data.ratings,
            release_date: appData.data[game.id].data.release_date.date,
          };
        })
      );

      setTopSellers(data);
      setLoading(false);
    } catch (e) {
      console.error("Error in fetching featured games on Steam");
      setError(
        `Error ${e.status}: fetching featured games on Steam, this may be due to constant refreshses to our API's. Please wait a few minutes to regain access. If you think this is a mistake on our end, please contact us below.`
      );
    }
  };

  useEffect(() => {
    fetchFeaturedCategories();
  }, []);

  return (
    <div>
      <h1>Top Selling</h1>

      {/* display table here */}
      <div>
        {loading && !error && <LoadingData />}
        {error && `${error}`}
        {!loading && !error && <Table data={topSellers} limit={limit} />}
      </div>
    </div>
  );
};

export default TopSelling;
