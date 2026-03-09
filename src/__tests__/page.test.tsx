import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home Page", () => {
  it("renders the main heading", () => {
    render(<Home />);
    const heading = screen.getByText("Dobeu Tech Solutions");
    expect(heading).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Home />);
    const subtitle = screen.getByText(
      /Automated Customer Sourcing.*Prospecting Platform/
    );
    expect(subtitle).toBeInTheDocument();
  });

  it("renders the three funnel stages", () => {
    render(<Home />);
    expect(screen.getByText("Source")).toBeInTheDocument();
    expect(screen.getByText("Prospect")).toBeInTheDocument();
    expect(screen.getByText("Convert")).toBeInTheDocument();
  });

  it("renders the footer with copyright", () => {
    render(<Home />);
    expect(
      screen.getByText(/2026 Dobeu Tech Solutions/)
    ).toBeInTheDocument();
  });
});
