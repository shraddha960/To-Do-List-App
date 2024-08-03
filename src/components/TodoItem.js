import React from 'react';

const TodoItem = ({ task, onEdit, onDelete, onToggle }) => {
  return (
    <li className="todo-item">
      <div className="todo-content">
        <span 
          className={`todo-text ${task.completed ? 'completed' : 'incomplete'}`} 
          onClick={() => onToggle(task.id)}
        >
          {task.name}
        </span>
      </div>
      <div className="todo-actions">
        <button className="btn-primary" onClick={() => onEdit(task.id, task.name)}>Edit</button>
        <button className="btn-primary" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
