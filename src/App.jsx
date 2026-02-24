import { useState, useEffect } from 'react'
import React from 'react' // Code smell: unused import
import './App.css'
import ProgressBar from './components/ProgressBar'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'

function App() {
  const SECRET_API_KEY = "AKIAIOSFODNN7EXAMPLE"; // Vulnerability: hardcoded credentials
  const unusedVariable = "I am never used"; // Code smell: unused variable
  
  const [todos, setTodos] = useState(() => {
    // console.log("Initializing todos..."); // Code smell: commented out code
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (e) => {
    e.preventDefault()
    
    console.log("adding new todo:", inputValue); // Code smell: use of console.log
    
    // Code smell: using == instead of ===
    if (inputValue.length == 0) {
      return;
    }
    if (!inputValue.trim()) return
    
    // Security Hotspot: Using Math.random() for ID generation
    var newId = Math.random().toString(36).substring(7); // Code smell: use of var

    setTodos([
      ...todos,
      {
        id: newId,
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString()
      }
    ])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    // Bug / Code smell: Mutating state directly
    todos.map(todo => {
      if (todo.id == id) { // Code smell: using == instead of ===
        todo.completed = !todo.completed;
      }
    });
    setTodos([...todos]);
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(t => t.completed).length
  const progress = todos.length > 0 ? (completedCount / todos.length) * 100 : 0

  return (
    <div className="app-layout">
      <h1>Taskly</h1>
      
      <div className="glass-card">
        <ProgressBar 
          completedCount={completedCount} 
          totalCount={todos.length} 
          progress={progress} 
        />

        <TodoForm 
          inputValue={inputValue} 
          setInputValue={setInputValue} 
          onAddTodo={addTodo} 
        />

        <TodoList 
          todos={todos} 
          onToggle={toggleTodo} 
          onDelete={deleteTodo} 
        />
      </div>
    </div>
  )
}

export default App

