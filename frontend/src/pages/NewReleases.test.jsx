import { render, screen, waitFor } from "@testing-library/react";
import NewReleases from "./NewReleases";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import axios from "axios";

vi.mock("axios");

describe("NewReleases", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("fetches and displays a game from new releases in Steam", async () => {
    // --- 1st API call: /featuredcategories ---
    axios.get.mockResolvedValueOnce({
      data: {
        new_releases: {
          id: "cat_newreleases",
          name: "New Releases",
          items: [
            {
              id: 1,
              name: "some game 1",
              final_price: 499,
              large_capsule_image: "large.jpg",
              small_capsule_image: "small.jpg",
            },
            // {
            //   id: 2,
            //   name: "some game 2",
            //   final_price: 0,
            //   large_capsule_image: "large.jpg",
            //   small_capsule_image: "small.jpg",
            // },
          ],
        },
      },
    });

    // --- 2nd API call: /appdetails?appids={game.id} ---
    axios.get.mockResolvedValueOnce({
      data: {
        1: {
          data: {
            ratings: {
              dejus: {
                rating_generated: "1",
                rating: "14",
                required_age: "14",
                banned: "0",
                use_age_gate: "0",
                descriptors: "Violencia\nMedo",
              },
              steam_german: {
                rating_generated: "1",
                rating: "16",
                required_age: "16",
                banned: "0",
                use_age_gate: "0",
                descriptors: "Horror",
              },
            },
            release_date: {
              comming_soon: "false",
              date: "Nov 29, 2025",
            },
          },
        },
      },
    });

    render(<NewReleases />);

    // expect it to search for the "game"
    expect(screen.getByText(/loading entries/i)).toBeInTheDocument();

    // wait for the table to render
    await waitFor(() => {
      expect(screen.getAllByText(/some game 1/i).length).toBe(2); // displays twice due to mobile and desktop tables
    });

    // expect that both APIs have already been called at this point with axios.get
    expect(axios.get).toHaveBeenCalledWith("/api/steam/featuredcategories");
    expect(axios.get).toHaveBeenCalledWith("/api/steam/appdetails?appids=1");
    expect(screen.getAllByText(/\$4.99/i).length).toBe(2);
  });

  it("fetches and displays a free game from new releases in Steam", async () => {
    // --- 1st API call: /featuredcategories ---
    axios.get.mockResolvedValueOnce({
      data: {
        new_releases: {
          id: "cat_newreleases",
          name: "New Releases",
          items: [
            {
              id: 2,
              name: "some game 2",
              final_price: 0,
              large_capsule_image: "large.jpg",
              small_capsule_image: "small.jpg",
            },
          ],
        },
      },
    });

    // --- 2nd API call: /appdetails?appids={game.id} ---
    axios.get.mockResolvedValueOnce({
      data: {
        2: {
          data: {
            ratings: {
              dejus: {
                rating_generated: "1",
                rating: "14",
                required_age: "14",
                banned: "0",
                use_age_gate: "0",
                descriptors: "Violencia\nMedo",
              },
              steam_german: {
                rating_generated: "1",
                rating: "16",
                required_age: "16",
                banned: "0",
                use_age_gate: "0",
                descriptors: "Horror",
              },
            },
            release_date: {
              comming_soon: "false",
              date: "Nov 29, 2025",
            },
          },
        },
      },
    });

    render(<NewReleases />);

    // expect it to search for the "game"
    expect(screen.getByText(/loading entries/i)).toBeInTheDocument();

    // wait for the table to render
    await waitFor(() => {
      expect(screen.getAllByText(/some game 2/i).length).toBe(2);
    });

    // expect that both apis have already been called at this point with axios.get
    expect(axios.get).toHaveBeenCalledWith("/api/steam/featuredcategories");
    expect(axios.get).toHaveBeenCalledWith("/api/steam/appdetails?appids=2");
    expect(screen.getAllByText(/free/i).length).toBe(2);
  });

  it("fetches and displays a non-rated game from new releases in Steam", async () => {
    // --- 1st API call: /featuredcategories ---
    axios.get.mockResolvedValueOnce({
      data: {
        new_releases: {
          id: "cat_newreleases",
          name: "New Releases",
          items: [
            {
              id: 3,
              name: "some game 3",
              final_price: 0,
              large_capsule_image: "large.jpg",
              small_capsule_image: "small.jpg",
            },
          ],
        },
      },
    });

    // --- 2nd API call: /appdetails?appids={game.id} ---
    axios.get.mockResolvedValueOnce({
      data: {
        3: {
          data: {
            ratings: null,
            release_date: {
              comming_soon: "false",
              date: "Nov 29, 2025",
            },
          },
        },
      },
    });

    render(<NewReleases />);

    // expect it to search for the "game"
    expect(screen.getByText(/loading entries/i)).toBeInTheDocument();

    // wait for the table to render
    await waitFor(() => {
      expect(screen.getAllByText(/some game 3/i).length).toBe(2);
    });

    // expect that both apis have already been called at this point with axios.get
    expect(axios.get).toHaveBeenCalledWith("/api/steam/featuredcategories");
    expect(axios.get).toHaveBeenCalledWith("/api/steam/appdetails?appids=3");
    expect(screen.getAllByText(/N\/A/i).length).toBe(2);
  });
});
