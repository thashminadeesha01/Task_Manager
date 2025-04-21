import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ onTaskAdded }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return; // Prevent empty submissions

        try {
            const response = await axios.post('http://localhost:3001/api/tasks', { title });
            onTaskAdded(response.data); 
            setTitle(''); 
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <div className="task-form">
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task..."
                    className="task-input"
                />
                <button type="submit" className="btn-add">Add Task</button>
            </form>
        </div>
    );
}

export default TaskForm;