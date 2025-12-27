import { useState, useEffect } from 'react';
import { taskService } from '../api/taskService';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const saved = localStorage.getItem('taskly_data');
      if (saved && JSON.parse(saved).length > 0) {
        setTasks(JSON.parse(saved));
      } else {
        const data = await taskService.fetchInitial();
        setTasks(data);
      }
      setLoading(false);
    };
    init();
  }, []);

  useEffect(() => {
    if (!loading) localStorage.setItem('taskly_data', JSON.stringify(tasks));
  }, [tasks, loading]);

  return {
    tasks, loading,
    add: (t) => setTasks([{ ...t, id: Date.now() }, ...tasks]),
    update: (u) => setTasks(tasks.map(t => t.id === u.id ? u : t)),
    remove: (id) => setTasks(tasks.filter(t => t.id !== id))
  };
};