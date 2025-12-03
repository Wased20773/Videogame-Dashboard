import { useEffect, useState } from "react";
import axios from "axios";
import ColumnChart from "../components/Charts/ColumnChart.jsx";
import FilterPanel from "../components/Charts/FilterPanel.jsx";
import "../styles/chart.css";
import LoadingData from "../components/LoadingData.jsx";
// For finding UNIX Timestamp
// https://www.unixtimestamp.com/

// genres, themes, game_types, language_supports, platforms, player_perspectives;
const MostCommon = () => {
  // Collections
  const [games, setGames] = useState([]);
  const [mapCounts, setMapCounts] = useState([]);

  // Tables
  const [genreTable, setGenreTable] = useState([]);
  const [themeTable, setThemeTable] = useState([]);
  const [gameTypeTable, setGameTypeTable] = useState([]);
  const [languageTable, setLanguageTable] = useState([]);
  const [platformTable, setPlatformTable] = useState([]);
  const [playerPerspectivesTable, setPlayerPerspectiveTable] = useState([]);

  // Status
  const [selectedTag, setSelectedTag] = useState("Genres");
  const [displayOption, setDisplayOption] = useState("no");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [error, setError] = useState(null);

  // Purpose: grabs each field that is needed for instant lookups instead of
  //          using a query request (Inhanced Performance)
  const fetchLookupTables = async () => {
    setLoading1(true);
    try {
      const [
        genresRes,
        themeRes,
        gameTypesRes,
        languagesRes,
        platformsRes,
        perspectivesRes,
      ] = await Promise.all([
        axios.post("/api/igdb/genres", `f id,name;l 500;`, {
          headers: {
            "Content-Type": "text/plain",
          },
        }),
        axios.post("/api/igdb/themes", `f id,name;l 500;`, {
          headers: {
            "Content-Type": "text/plain",
          },
        }),
        axios.post("/api/igdb/game_types", `f id,type;l 500;`, {
          headers: {
            "Content-Type": "text/plain",
          },
        }),
        axios.post("/api/igdb/languages", `f id,name;l 500;`, {
          headers: {
            "Content-Type": "text/plain",
          },
        }),
        axios.post("/api/igdb/platforms", `f id,name;l 500;`, {
          headers: {
            "Content-Type": "text/plain",
          },
        }),
        axios.post("/api/igdb/player_perspectives", `f id,name;l 500;`, {
          headers: {
            "Content-Type": "text/plain",
          },
        }),
      ]);

      // Set Genres
      const genreMap = {};
      genresRes.data.forEach((g) => (genreMap[g.id] = g.name));
      setGenreTable(genreMap);

      // Set Themes
      const themeMap = {};
      themeRes.data.forEach((g) => (themeMap[g.id] = g.name));
      setThemeTable(themeMap);

      // Set Game Types
      const gameTypesMap = {};
      gameTypesRes.data.forEach((g) => (gameTypesMap[g.id] = g.type));
      setGameTypeTable(gameTypesMap);

      // Set Language
      const languageMap = {};
      languagesRes.data.forEach((l) => {
        languageMap[l.id] = l.name;
      });
      setLanguageTable(languageMap);

      // Set Platform
      const platformMap = {};
      platformsRes.data.forEach((p) => (platformMap[p.id] = p.name));
      setPlatformTable(platformMap);

      // Set Player Perspective
      const persMap = {};
      perspectivesRes.data.forEach((p) => (persMap[p.id] = p.name));
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
    const date = 1735718400;
    while (flag === true) {
      const query = `
            f name, genres, themes, game_type, language_supports.language, platforms, player_perspectives;
            where first_release_date > ${date};
            l ${limit};
            o ${offset};
        `;

      try {
        const response = await axios.post("/api/igdb/games", query, {
          headers: {
            "Content-Type": "text/plain",
          },
        });
        allGames.push(...response.data);

        if (response.data.length < limit) {
          flag = false;
          break;
        }
        offset += limit;
      } catch (e) {
        console.error("Error fetching games from IGDB's API: ", e);
        setError(
          `Error ${e}: Something wrong happen when fetching games from IGDB's API`
        );
        setLoading2(false);
        flag = false;
      }
    }
    setGames(allGames);
    setLoading2(false);
  };

  const CountAll = function CountAllFromTheLoadedGames(tag, table) {
    const counts = {};

    games.forEach((game) => {
      // Case 1: tag is nested string
      if (Array.isArray(tag)) {
        const [firstPath, secondPath] = tag;
        if (game[firstPath] === null || game[firstPath] === undefined) return;

        game[firstPath].forEach((obj) => {
          const id = obj[secondPath];
          if (id === null || id === undefined) return;

          const name = table[id];
          if (name === null || name === undefined) return;

          counts[name] = (counts[name] || 0) + 1;
        });
      }
      // Case 2: tag is string
      else {
        if (game[tag] === null || game[tag] === undefined) return;

        if (Array.isArray(game[tag])) {
          game[tag].forEach((id) => {
            const name = table[id];
            if (name === null || name === undefined) return;

            counts[name] = (counts[name] || 0) + 1;
          });
        } else {
          const name = table[game[tag]];
          if (!name) return;
          counts[name] = (counts[name] || 0) + 1;
        }
      }
    });

    // Return a sorted array
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  };

  useEffect(() => {
    fetchLookupTables();
    fetchAtMostGames();
    setSelectedTag("Genres");
    setDisplayOption("no");
  }, []);

  useEffect(() => {
    if (games.length === 0) return;

    const genres = CountAll("genres", genreTable);
    const themes = CountAll("themes", themeTable);
    const gameTypes = CountAll("game_type", gameTypeTable);
    const languages = CountAll(
      ["language_supports", "language"],
      languageTable
    );
    const platforms = CountAll("platforms", platformTable);
    const playerPerspectives = CountAll(
      "player_perspectives",
      playerPerspectivesTable
    );

    setMapCounts({
      Genres: genres,
      Themes: themes,
      "Game Types": gameTypes,
      Languages: languages,
      Platforms: platforms,
      "Player Perspectives": playerPerspectives,
    });
  }, [games]);

  useEffect(() => {});

  return (
    <div>
      <h1>MostCommon</h1>
      {!loading1 && !loading2 ? (
        <div className="chart-container">
          <ColumnChart
            tagCount={mapCounts[selectedTag]}
            displayOption={displayOption}
            selectedTag={selectedTag}
          />

          <FilterPanel
            selectedTag={selectedTag}
            setSelectedTag={setSelectedTag}
            displayOption={displayOption}
            setDisplayOption={setDisplayOption}
          />
        </div>
      ) : (
        <LoadingData />
      )}
    </div>
  );
};

export default MostCommon;
