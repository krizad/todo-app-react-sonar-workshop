import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  const mockTodos = [
    {
      id: "1",
      text: "First Todo",
      completed: false,
      createdAt: "2024-01-01T10:00:00.000Z",
    },
    {
      id: "2",
      text: "Second Todo",
      completed: true,
      createdAt: "2024-01-02T10:00:00.000Z",
    },
  ];

  it("renders empty state when todos are empty", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={[]} onToggle={onToggle} onDelete={onDelete} />);
    expect(screen.getByText(/No tasks yet. Add one above!/i)).toBeInTheDocument();
  });

  it("renders a list of todos sorted by createdAt (newest first)", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />);
    
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    
    // Second Todo is newer, so it should be first in the sorted output
    expect(items[0]).toHaveTextContent("Second Todo");
    expect(items[1]).toHaveTextContent("First Todo");
  });
});
