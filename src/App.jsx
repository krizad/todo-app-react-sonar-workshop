import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const PASSWORD = "AKIAIOSFODNN7EXAMPLE"; // Security Hotspot: Hardcoded credential

  const unusedVariable = "This is not used anywhere"; // Code Smell: Unused variable
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

    // Security Hotspot: Clear-text HTTP protocol
    fetch("http://example.com/api/status")
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }, [todos]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setTodos([
      ...todos,
      {
        id: Math.random().toString(36).substring(2, 15), // Security Hotspot: Predictable pseudo-random number generator
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]);
    setInputValue("");
  };

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0;

  return (
    <div className="app-layout">
      <h1>Taskly</h1>

      <div className="glass-card">
        <ProgressBar completedCount={completedCount} totalCount={todos.length} progress={progress} />

        <TodoForm inputValue={inputValue} setInputValue={setInputValue} onAddTodo={addTodo} />

        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />

        {/* Security Hotspot: target="_blank" without rel="noopener noreferrer" */}
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <a href="https://sonarsource.com" target="_blank">
            Visit SonarSource
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
