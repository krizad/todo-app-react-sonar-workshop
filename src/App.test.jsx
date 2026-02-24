import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import App from "./App";

// Mock crypto.randomUUID for consistent IDs in tests if needed
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = {
    randomUUID: () => Math.random().toString(36).substring(2)
  };
} else if (!globalThis.crypto.randomUUID) {
  globalThis.crypto.randomUUID = () => Math.random().toString(36).substring(2);
}

describe("App Component", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("renders correctly with empty state", () => {
    render(<App />);
    expect(screen.getByText(/Taskly/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Add a new task/i)).toBeInTheDocument();
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it("adds a new todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(input.value).toBe("");
    expect(screen.queryByText(/No tasks yet/i)).not.toBeInTheDocument();
  });

  it("toggles a todo completion status", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Toggle Task" } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole("checkbox", { name: /Mark "Toggle Task" as complete/i });
    fireEvent.click(checkbox);

    expect(screen.getByRole("listitem")).toHaveClass("completed");
    expect(screen.getByText(/1 of 1 tasks/i)).toBeInTheDocument();

    fireEvent.click(checkbox);
    expect(screen.getByRole("listitem")).not.toHaveClass("completed");
    expect(screen.getByText(/0 of 1 tasks/i)).toBeInTheDocument();
  });

  it("deletes a todo", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Delete Task" } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByLabelText(/Delete task: Delete Task/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Delete Task")).not.toBeInTheDocument();
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it("persists todos to localStorage", () => {
    const { unmount } = render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.change(input, { target: { value: "Persistent Task" } });
    fireEvent.click(addButton);

    expect(localStorage.getItem("todos")).toContain("Persistent Task");

    unmount();

    render(<App />);
    expect(screen.getByText("Persistent Task")).toBeInTheDocument();
  });

  it("does not add an empty todo", () => {
    render(<App />);
    const addButton = screen.getByRole("button", { name: /Add/i });

    fireEvent.click(addButton);
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it("updates progress bar correctly", () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Add a new task/i);
    const addButton = screen.getByRole("button", { name: /Add/i });

    // Add two tasks
    fireEvent.change(input, { target: { value: "Task 1" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Task 2" } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole("checkbox");

    // Complete first task
    fireEvent.click(checkboxes[0]);

    expect(screen.getByText(/1 of 2 tasks/i)).toBeInTheDocument();
    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toHaveValue(1);
    expect(progressBar).toHaveAttribute("max", "2");
  });
});
