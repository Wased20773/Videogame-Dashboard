import express from "express";
import axios from "axios";
import cors from "cors";

const PORT = 5000;
const app = express();
app.use(cors());

// Route: GetAppList -> results to all apps in Steam
app.get("/api/steam/GetAppList", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.steampowered.com/ISteamApps/GetAppList/v2"
    );
    res.json(response.data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ e: "Failed to fetch Steam's apps list" });
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
    console.error(e);
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
    console.error(e);
    res.json({ e: "Failed to get app details from Steam" });
  }
});

app.listen(PORT, () =>
  console.log(`Backend proxy running on http://localhost:${PORT}`)
);
