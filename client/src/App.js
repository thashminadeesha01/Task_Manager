import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Failed to load tasks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        // Call the fetchTasks function
        fetchTasks();
    }, []); // Empty dependency array ensures this runs only once

    // ✅ Handle adding a new task
    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [newTask, ...prevTasks]);
    };

    // ✅ Handle task updates
    const handleTaskUpdated = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
    };

    // ✅ Handle task deletion
    const handleTaskDeleted = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    };

    // ✅ Handle loading and error states
    if (loading) return <div className="loading">Loading tasks...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="app">
            <header className="app-header">
                <h1>Task Manager</h1>
            </header>
            <main className="app-main">
                <TaskForm onTaskAdded={handleTaskAdded} />
                <TaskList
                    tasks={tasks}
                    onTaskUpdated={handleTaskUpdated}
                    onTaskDeleted={handleTaskDeleted}
                />
            </main>
            <footer className="app-footer">
                <p>Built with Express & React frameworks</p>
            </footer>
        </div>
    );
}

export default App;