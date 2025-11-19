import { useEffect, useState } from "react";
import PieChart from "../components/Charts/PieChart.jsx";
import axios from "axios";
import "../styles/PieChart.css";

// For finding UNIX Timestamp
// https://www.unixtimestamp.com/

const baseURL =
  "https://gliwev5ic1.execute-api.us-west-2.amazonaws.com/production/v4";
const x_api_key = "O73wy6g7xl7I6U3G1KJER40vqTusQwut2WXoRX8N";
// language_supports, platforms, player_perspectives;
const MostCommon = () => {
  // Collections
  const [games, setGames] = useState([]);
  const [genreCounts, setGenreCounts] = useState([]);

  // Tables
  const [genreTable, setGenreTable] = useState([]);
  const [languageTable, setLanguageTable] = useState([]);
  const [platformTable, setPlatformTable] = useState([]);
  const [playerPerspectivesTable, setPlayerPerspectiveTable] = useState([]);

  // Status
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState(null);

  // Purpose: grabs each field that is needed for instant lookups instead of
  //          using a query request (Inhanced Performance)
  const fetchLookupTables = async () => {
    setLoading1(true);
    try {
      // Set Genres
      const genres = await axios.post(`${baseURL}/genres`, `f id,name;l 500;`, {
        headers: { "x-api-key": x_api_key },
      });
      console.log(genres.data);
      const genreMap = {};
      genres.data.forEach((g) => (genreMap[g.id] = g.name));
      setGenreTable(genreMap);

      // Set Language
      const language = await axios.post(
        `${baseURL}/languages`,
        `f id,name; l 500;`,
        { headers: { "x-api-key": x_api_key } }
      );
      console.log(language.data);
      const languageMap = {};
      language.data.forEach((l) => {
        languageMap[l.id] = l.name;
      });
      setLanguageTable(languageMap);

      // Set Platform
      const platforms = await axios.post(
        `${baseURL}/platforms`,
        `f id,name; l 500;`,
        { headers: { "x-api-key": x_api_key } }
      );
      console.log(platforms.data);
      const platformMap = {};
      platforms.data.forEach((p) => (platformMap[p.id] = p.name));
      setPlatformTable(platformMap);

      // Set Player Perspective
      const perspectives = await axios.post(
        `${baseURL}/player_perspectives`,
        `f id,name; l 50;`,
        { headers: { "x-api-key": x_api_key } }
      );
      console.log(perspectives.data);
      const persMap = {};
      perspectives.data.forEach((p) => (persMap[p.id] = p.name));
      setPlayerPerspectiveTable(persMap);

      setLoading1(false);
    } catch (e) {
      console.error("Error fetching a list of genres from IGDB API: ", e);
      setError(`Error ${e.status}: fetching a list of genres from IGDB API`);
      setLoading1(false);
    }
  };

  // purpose: IGDB only allows 500 entries with one query. We can fetch all
  //          games in one request using pagination with an offsets
  const fetchAtMostGames = async () => {
    setLoading2(true);

    let allGames = [];
    let offset = 0;
    const limit = 500;
    let flag = true;
    while (flag === true) {
      const query = `
            f name, genres, language_supports.language, platforms, player_perspectives;
            where first_release_date > 1735718400 & game_type = 0;
            l ${limit};
            o ${offset};
        `;

      try {
        const response = await axios.post(`${baseURL}/games`, query, {
          headers: {
            "x-api-key": x_api_key,
          },
        });
        console.log(response.data);
        allGames.push(...response.data);

        if (response.data.length < limit) {
          flag = false;
          break;
        }
        offset += limit;
      } catch (e) {
        console.error("Error fetching games from IGDB API: ", e);
        setError(`Error ${e}: fetching games from IGDB API`);
        setLoading2(false);
        flag = false;
      }
    }
    setGames(allGames);
    setLoading2(false);
  };

  const CountAllGenres = function CountAllGenresFromTheLoadedGames() {
    const genreCounts = {};

    games.forEach((game) => {
      if (!game.genres) return;

      game.genres.forEach((id) => {
        const name = genreTable[id];
        if (!name) return;

        // Entry doesn't exist? Create it... else increment it
        if (!genreCounts[name]) genreCounts[name] = 1;
        else genreCounts[name] += 1;
      });
    });

    // Return a sorted array
    return Object.entries(genreCounts).sort((a, b) => b[1] - a[1]);
  };

  useEffect(() => {
    fetchLookupTables();
    fetchAtMostGames();
  }, []);

  useEffect(() => {
    if (games.length > 0) {
      console.log(`Total Games Loaded: ${games.length}`);
      setGenreCounts(CountAllGenres());
    }
  }, [games]);

  return (
    <div>
      <h1>MostCommon</h1>
      {!loading1 && !loading2 ? (
        <div className="piechart-container">
          <PieChart genreCount={genreCounts} games={games} />
        </div>
      ) : (
        "loading..."
      )}
    </div>
  );
};

export default MostCommon;
