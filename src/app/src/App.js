import React, { useState, useEffect } from 'react';
import './App.css';

export function App() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    // Fetch TODOs from the backend when the component mounts
    useEffect(() => {
        fetch('http://localhost:8000/todos/')
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error('Error fetching TODOs:', error));
    }, []);

    // Handle form submission to create a new TODO
    const handleSubmit = (event) => {
        event.preventDefault();  // Prevent page reload
        if (!newTodo.trim()) return;

        const todoItem = { title: newTodo };

        fetch('http://localhost:8000/todos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todoItem),
        })
            .then(response => response.json())
            .then(data => {
                // Refresh the TODO list after adding a new TODO
                setTodos([...todos, todoItem]);
                setNewTodo('');  // Clear the input field
            })
            .catch(error => console.error('Error adding TODO:', error));
    };

    // Handle input change
    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    return (
        <div className="App">
            <div>
                <h1>List of TODOs</h1>
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index}>{todo.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h1>Create a ToDo</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="todo">ToDo: </label>
                        <input
                            type="text"
                            id="todo"
                            value={newTodo}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{"marginTop": "5px"}}>
                        <button type="submit">Add ToDo!</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
