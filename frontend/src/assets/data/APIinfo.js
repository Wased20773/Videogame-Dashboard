import SteamLogoPNG from "../steam.png";
import IGDBLogoPNG from "../igdb.png";

// Holds a static collection of API info
export const APIinfo = {
  steam: {
    name: "Steam Web API",
    short: "steam",
    theme: "steam-theme",
    img: SteamLogoPNG,
    alt: "Company logo for Steam Web API",
    info: "Provides public data such as game details, store listings, sales,  and featured games. Also offers private data (friends, owned games, etc.) with an API key, but only public data is used here.",
    documentation: [
      {
        type: "official",
        author: "Steam",
        url: "https://developer.valvesoftware.com/wiki/Steam_Web_API",
      },
      {
        type: "community",
        author: "xPaw",
        url: "https://steamapi.xpaw.me/",
      },
    ],
  },
  igdb: {
    name: "Internet Game Database",
    short: "igdb",
    theme: "igdb-theme",
    img: IGDBLogoPNG,
    alt: "game logo for IGDB API",
    info: "A comprehensive game database offering detailed metadata such as game modes, release dates, supported platforms, and time-to-beat statistics",
    documentation: [
      {
        type: "official",
        author: "IGDB",
        url: "https://api-docs.igdb.com/#getting-started",
      },
    ],
  },
};
