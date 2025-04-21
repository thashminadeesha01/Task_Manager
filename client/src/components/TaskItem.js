import React from 'react';
import axios from 'axios';

function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const toggleStatus = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/api/tasks/${task._id}/toggle`);
            onTaskUpdated(response.data); // Notify parent component of the updated task
        } catch (error) {
            console.error('Error toggling task status:', error);
        }
    };

    const deleteTask = async () => {
        try {
            await axios.delete(`http://localhost:3001/api/tasks/${task._id}`); // Use relative URL for consistency
            onTaskDeleted(task._id); // Notify parent component of the deleted task
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className={`task-item ${task.status === 'completed' ? 'completed' : ''}`}>
            <span className="task-title">{task.title}</span>
            <div className="task-actions">
                <button onClick={toggleStatus} className="btn-toggle">
                    {task.status === 'completed' ? '↩️ Mark Pending' : '✓ Mark Complete'}
                </button>
                <button onClick={deleteTask} className="btn-delete">🗑 Delete</button>
            </div>
        </div>
    );
}

export default TaskItem;