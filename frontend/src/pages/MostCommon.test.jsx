import { render, screen, waitFor } from "@testing-library/react";
import MostCommon from "./MostCommon";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("MostCommon", () => {
  beforeEach(() => {
    axios.post.mockImplementation((url) => {
      switch (url) {
        case "/api/igdb/genres":
          return Promise.resolve({
            data: [{ id: 1, name: "Action" }],
          });

        case "/api/igdb/themes":
          return Promise.resolve({
            data: [{ id: 6, name: "Horror" }],
          });

        case "/api/igdb/game_types":
          return Promise.resolve({
            data: [{ id: 10, type: "Main Game" }],
          });

        case "/api/igdb/languages":
          return Promise.resolve({
            data: [{ id: 25, name: "English" }],
          });

        case "/api/igdb/platforms":
          return Promise.resolve({
            data: [{ id: 40, name: "PC (Windows)" }],
          });

        case "/api/igdb/player_perspectives":
          return Promise.resolve({
            data: [{ id: 44, name: "First-person" }],
          });

        case "/api/igdb/games":
          // Only 1 page returned (<500), stops pagination
          return Promise.resolve({
            data: [
              {
                name: "Mock Game",
                genres: [1],
                themes: [6],
                game_type: 10,
                language_supports: [{ language: 25 }],
                platforms: [40],
                player_perspectives: [44],
              },
            ],
          });
      }
    });
  });

  it("fetches IGDB lookup tables and computes genre/theme/language_supports/platforms/player_perspectives counts", async () => {
    render(<MostCommon />);

    // Wait for the chart to render
    await waitFor(() =>
      expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument()
    );

    // expect that all APIs have been called
    expect(axios.post).toHaveBeenCalledWith(
      "/api/igdb/genres",
      expect.any(String),
      expect.any(Object)
    );
    expect(axios.post).toHaveBeenCalledWith(
      "/api/igdb/themes",
      expect.any(String),
      expect.any(Object)
    );
    expect(axios.post).toHaveBeenCalledWith(
      "/api/igdb/game_types",
      expect.any(String),
      expect.any(Object)
    );
    expect(axios.post).toHaveBeenCalledWith(
      "/api/igdb/languages",
      expect.any(String),
      expect.any(Object)
    );
    expect(axios.post).toHaveBeenCalledWith(
      "/api/igdb/platforms",
      expect.any(String),
      expect.any(Object)
    );
    expect(axios.post).toHaveBeenCalledWith(
      "/api/igdb/player_perspectives",
      expect.any(String),
      expect.any(Object)
    );
  });
});
