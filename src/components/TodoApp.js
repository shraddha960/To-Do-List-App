import React, { useState } from 'react';
import TodoItem from './TodoItem';
import './TodoApp.css';  // Import the CSS file

const TodoApp = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editTaskId) {
      setTasks(tasks.map(t => 
        t.id === editTaskId ? { ...t, name: task } : t
      ));
      setEditTaskId(null);
    } else {
      setTasks([...tasks, { id: Date.now(), name: task, completed: false }]);
    }
    setTask('');
  };

  const handleEdit = (id, name) => {
    setTask(name);
    setEditTaskId(id);
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleToggle = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <button type="submit">{editTaskId ? 'Update' : 'Add'} Task</button>
      </form>
      <div className="todo-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''} 
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button 
          className={filter === 'incomplete' ? 'active' : ''} 
          onClick={() => setFilter('incomplete')}
        >
          Incomplete
        </button>
      </div>
      <ul className="todo-list">
        {filteredTasks.map(task => (
          <TodoItem 
            key={task.id} 
            task={task} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            onToggle={handleToggle} 
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
