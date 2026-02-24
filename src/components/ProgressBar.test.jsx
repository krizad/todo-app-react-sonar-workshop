import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProgressBar from "./ProgressBar";

describe("ProgressBar Component", () => {
  it("renders with correct completedCount and totalCount text", () => {
    render(<ProgressBar completedCount={2} totalCount={5} progress={40} />);
    
    expect(screen.getByText("Progress")).toBeInTheDocument();
    expect(screen.getByText("2 of 5 tasks")).toBeInTheDocument();
  });

  it("renders the progress element with correct values", () => {
    render(<ProgressBar completedCount={2} totalCount={5} progress={40} />);
    
    const progressEl = screen.getByRole("progressbar");
    expect(progressEl).toBeInTheDocument();
    expect(progressEl).toHaveValue(2);
    expect(progressEl).toHaveAttribute("max", "5");
    expect(progressEl).toHaveTextContent("40%");
  });
});
