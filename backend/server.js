import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.text());

const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL;
const X_API_KEY = process.env.X_API_KEY;

// --- STEAM WEB API --- //

// Route: GetAppList -> results to all apps in Steam
app.get("/api/steam/GetAppList", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    );
    res.json(response.data);
  } catch (e) {
    console.error("Error fetching Steam app list:", e.message);
    res.status(500).json({ e: "Failed to fetch Steam app list" });
  }
});

// Route: featuredcategories -> {spotlights, daily_deal, specials, comming_soon, top_sellers, new_releases}
app.get("/api/steam/featuredcategories", async (req, res) => {
  try {
    const response = await axios.get(
      "https://store.steampowered.com/api/featuredcategories"
    );
    res.json(response.data);
  } catch (e) {
    console.error("Error fetching featured category from Steam:", e.message);
    res.status(500).json({ e: "Failed to fetch Steam's featured category" });
  }
});

// Route: appdetails?appids -> shows full app details of one app
app.get("/api/steam/appdetails", async (req, res) => {
  const appid = req.query.appids;
  try {
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appid}`
    );

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching Steam app details:", e.message);
    res.status(500).json({ e: "Failed to fetch app details from Steam" });
  }
});

// --- IGDB API --- //
// Route: genres -> List all genres in IGDB
app.post("/api/igdb/genres", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/genres`, req.body, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching genres list from IGDB:", e.message);
    res.status(500).json({ e: "Failed to fetch genres list from IGDB" });
  }
});

// Route: themes -> List all themes in IGDB
app.post("/api/igdb/themes", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/themes`, req.body, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching themes list from IGDB:", e.message);
    res.status(500).json({ e: "Failed to fetch themes list from IGDB" });
  }
});

// Route: game_types -> List the types of games in IGDB
app.post("/api/igdb/game_types", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/game_types`, req.body, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching game_types list from IGDB:", e.message);
    res.status(500).json({ e: "Failed to fetch game_types list from IGDB" });
  }
});

// Route: languages -> List all languages in IGDB
app.post("/api/igdb/languages", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/languages`, req.body, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching languages list from IGDB:", e.message);
    res.status(500).json({ e: "Failed to fetch languages list from IGDB" });
  }
});

// Route: platform -> List all platforms in IGDB
app.post("/api/igdb/platforms", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/platforms`, req.body, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching platforms list from IGDB:", e.message);
    res.status(500).json({ e: "Failed to fetch platforms list from IGDB" });
  }
});

// Route: player_perspectives -> List all player perspectives in IGDB
app.post("/api/igdb/player_perspectives", async (req, res) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/player_perspectives`,
      req.body,
      {
        headers: {
          "x-api-key": X_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (e) {
    console.error(
      "Error fetching player perspectives list from IGDB:",
      e.message
    );
    res
      .status(500)
      .json({ e: "Failed to fetch player perspectives list from IGDB" });
  }
});

// Route: games -> List games from IGDB (list only 500 entries at a time)
app.post("/api/igdb/games", async (req, res) => {
  try {
    const response = await axios.post(`${BASE_URL}/games`, req.body, {
      headers: {
        "x-api-key": X_API_KEY,
      },
    });

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching games list from IGDB:", e.message);
    res.status(500).json({ e: "Failed to fetch games list from IGDB" });
  }
});

// Route: release_dates -> List the release dates from IGDB (list only 500 entries at a time)
app.post("/api/igdb/release_dates/count", async (req, res) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/release_dates/count`,
      req.body,
      {
        headers: {
          "x-api-key": X_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (e) {
    console.error("Error fetching release dates list from IGDB:", e.message);
    res.status(500).json({ e: "Failed to fetch release dates list from IGDB" });
  }
});

app.listen(PORT, () => console.log(`Backend proxy running on port ${PORT}`));
