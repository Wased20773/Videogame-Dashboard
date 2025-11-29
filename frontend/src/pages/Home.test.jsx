import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Home Page Rendering", () => {
  it("renders h1", () => {
    render(<Home />);
    expect(screen.getByText("Games Dashboard")).toBeInTheDocument();
  });
  it("renders h2", () => {
    render(<Home />);
    expect(
      screen.getByText("Over 200,000 games from API's")
    ).toBeInTheDocument();
  });
  it("renders h3", () => {
    render(<Home />);
    expect(screen.getByText("API's that are in place")).toBeInTheDocument();
  });
});
