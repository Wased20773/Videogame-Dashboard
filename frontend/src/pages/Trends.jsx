import axios from "axios";
import { useEffect, useState } from "react";
import Histogram from "../components/Charts/Histogram.jsx";
import FilterPanel from "../components/Charts/FilterPanel.jsx";
import LoadingData from "../components/LoadingData.jsx";
// For finding UNIX Timestamp
// https://www.unixtimestamp.com/

// Release dates per year
const Trends = () => {
  const [releaseData, setreleaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNumberOfGames = async () => {
    setLoading(true);

    try {
      const now = new Date();
      const counts = [];
      const yearLength = 10;
      for (let i = 0; i < yearLength; i++) {
        // Calculate the range for this year
        const end = Math.floor(
          new Date().setFullYear(now.getFullYear() - i) / 1000
        );
        const start = Math.floor(
          new Date().setFullYear(now.getFullYear() - (i + 1)) / 1000
        );

        const response = await axios.post(
          "/api/igdb/release_dates/count",
          `where date >= ${start} & date <= ${end};`,
          { headers: { "Content-Type": "text/plain" } }
        );

        // unshift adds to the front, last entry is first index
        counts.unshift({
          year: now.getFullYear() - (i + 1),
          count: response.data.count,
        });
        console.log(counts);
      }
      setreleaseData(counts);
      setLoading(false);
    } catch (e) {
      console.error("Error in fetching release dates from IGDB's API: ", e);
      setError(
        `Error ${e}: Something wrong happen when fetching for release date from IGDB's API. Please try again.`
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNumberOfGames();
  }, []);

  return (
    <div>
      <h1>Trends</h1>
      {!loading ? (
        <div className="chart-container">
          <div>
            <Histogram dates={releaseData} />
          </div>
        </div>
      ) : (
        <LoadingData />
      )}
    </div>
  );
};

export default Trends;
