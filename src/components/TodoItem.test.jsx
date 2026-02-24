import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoItem from "./TodoItem";

describe("TodoItem Component", () => {
  const mockTodo = {
    id: "1",
    text: "Test Todo",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  it("renders the todo text", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />);
    expect(screen.getByText("Test Todo")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("calls onToggle when checkbox is clicked", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />);
    
    // The checkbox input element
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    
    expect(onToggle).toHaveBeenCalledWith("1");
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("calls onDelete when delete button is clicked", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />);
    
    // The delete button
    const deleteBtn = screen.getByRole("button", { name: /Delete task: Test Todo/i });
    fireEvent.click(deleteBtn);
    
    expect(onDelete).toHaveBeenCalledWith("1");
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("renders with completed class when completed is true", () => {
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={onToggle} onDelete={onDelete} />);
    
    const listItem = screen.getByRole('listitem');
    expect(listItem).toHaveClass("completed");
    
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });
});
