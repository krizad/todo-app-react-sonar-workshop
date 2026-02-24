import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TodoForm from "./TodoForm";

describe("TodoForm Component", () => {
  it("renders the input and add button", () => {
    const setInputValue = vi.fn();
    const onAddTodo = vi.fn();

    render(<TodoForm inputValue="" setInputValue={setInputValue} onAddTodo={onAddTodo} />);
    
    expect(screen.getByPlaceholderText(/Add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
  });

  it("calls setInputValue on input change", () => {
    const setInputValue = vi.fn();
    const onAddTodo = vi.fn();

    render(<TodoForm inputValue="" setInputValue={setInputValue} onAddTodo={onAddTodo} />);
    
    const input = screen.getByPlaceholderText(/Add a new task/i);
    fireEvent.change(input, { target: { value: "New Task Input" } });
    
    expect(setInputValue).toHaveBeenCalledWith("New Task Input");
    expect(setInputValue).toHaveBeenCalledTimes(1);
  });

  it("calls onAddTodo on form submission", () => {
    const setInputValue = vi.fn();
    const onAddTodo = vi.fn((e) => e.preventDefault());

    render(<TodoForm inputValue="Test Task" setInputValue={setInputValue} onAddTodo={onAddTodo} />);
    
    const addButton = screen.getByRole("button", { name: /Add/i });
    fireEvent.click(addButton);
    
    expect(onAddTodo).toHaveBeenCalledTimes(1);
  });
});
