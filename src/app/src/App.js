import React, { useState, useEffect } from 'react';
import './App.css';

function TodoItem({ todo }) {
    return <li>{todo.title}</li>;
}

function TodoForm({ onAddTodo }) {
    const [newTodo, setNewTodo] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newTodo.trim()) return;

        onAddTodo(newTodo);
        setNewTodo(''); // Clear the input field
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="todo">ToDo: </label>
                <input
                    type="text"
                    id="todo"
                    value={newTodo}
                    onChange={(event) => setNewTodo(event.target.value)}
                />
            </div>
            <div style={{ marginTop: "5px" }}>
                <button type="submit">Add ToDo!</button>
            </div>
        </form>
    );
}

export function App() {
    const [todos, setTodos] = useState([]);
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchTodos = () => {
        fetch(`${backendUrl}/todos/`)
            .then(response => response.json())
            .then(data => {
                setTodos(data);
            })
            .catch(error => console.error('Error fetching TODOs:', error));
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const addTodo = (title) => {
        const todoItem = { title };

        fetch(`${backendUrl}/todos/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoItem),
        })
            .then(response => response.json())
            .then(data => {
                // After successfully adding the todo, fetch all todos
                fetchTodos();
            })
            .catch(error => console.error('Error adding TODO:', error));
    };

    return (
        <div className="App">
            <div>
                <h1>List of TODOs</h1>
                <ul>
                    {todos.map((todo, index) => (
                        <TodoItem key={index} todo={todo} />
                    ))}
                </ul>
            </div>
            <div>
                <h1>Create a ToDo</h1>
                <TodoForm onAddTodo={addTodo} />
            </div>
        </div>
    );
}

export default App;