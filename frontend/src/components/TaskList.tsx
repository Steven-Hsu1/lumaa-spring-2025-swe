import React, { useEffect, useState, useCallback } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';

const TaskList: React.FC<{ token: string }> = ({ token }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await getTasks(token);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (editingTaskId !== null) {
        // Update existing task
        await updateTask(token, editingTaskId, title, description, false);
        setEditingTaskId(null); // Reset editing state
      } else {
        // Create new task
        await createTask(token, title, description);
      }
      // Clear input fields
      setTitle('');
      setDescription('');
      // Refresh tasks
      await fetchTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  const handleEditTask = (id: number): void => {
    const taskToEdit = tasks.find(task => task.id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setEditingTaskId(id);
    }
  };

  const handleDeleteTask = async (id: number): Promise<void> => {
    try {
      await deleteTask(token, id);
      await fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleCancelEdit = (): void => {
    setEditingTaskId(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div>
      <h2>Task List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">
          {editingTaskId !== null ? 'Update Task' : 'Add Task'}
        </button>
        {editingTaskId !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel Edit
          </button>
        )}
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              {task.title} - {task.description}
            </span>
            <button onClick={() => handleEditTask(task.id)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;