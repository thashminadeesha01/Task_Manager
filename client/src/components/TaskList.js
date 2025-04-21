import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
    return (
        <div className="task-list">
            <h2>Your Tasks</h2>
            {tasks.length === 0 ? (
                <p className="no-tasks">No tasks yet. Add one above!</p>
            ) : (
                tasks.map((task) => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onTaskUpdated={onTaskUpdated}
                        onTaskDeleted={onTaskDeleted}
                    />
                ))
            )}
        </div>
    );
}

export default TaskList;