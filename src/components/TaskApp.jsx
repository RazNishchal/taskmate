import React, { useState, useMemo } from "react";
import { useTasks } from "../hooks/useTasks";
import { useTheme } from "../hooks/useTheme";
import { useDebounce } from "../hooks/useDebounce";
import { TaskItem } from "./task/TaskItem";
import { TaskFilter } from "./task/TaskFilter";
import { TaskSort } from "./task/TaskSort";
import { TaskForm } from "./TaskForm";
import { Button } from "./common/Button";

const TaskApp = () => {
  const { tasks, loading, add, update, remove } = useTasks();
  const [theme, toggleTheme] = useTheme();
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("date");
  const [modalTask, setModalTask] = useState(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 300);

  const processedTasks = useMemo(() => {
    let result = tasks.filter(
      (t) =>
        (filter === "All" || t.status === filter) &&
        t.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    if (sort === "date") {
      result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sort === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [tasks, filter, sort, debouncedSearch]);

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center dark:bg-slate-950 transition-colors">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-500 font-bold">
          Initializing 10 Tasks...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 sm:p-8 lg:p-12 transition-colors">
      {/* Increased max-width from 4xl to 7xl for better wide-screen support */}
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-10">
          <h1 className="text-4xl font-black dark:text-white italic tracking-tighter">
            TaskMate
          </h1>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              onClick={toggleTheme}
              className="flex-1 sm:flex-none"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </Button>
            <Button
              onClick={() =>
                setModalTask({ title: "", dueDate: "", status: "Pending" })
              }
              className="flex-[2] sm:flex-none"
            >
              + Add Task
            </Button>
          </div>
        </header>

        {/* Responsive Search and Filters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white dark:bg-slate-900 p-4 rounded-3xl border dark:border-slate-800 shadow-sm">
          <input
            className="p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <TaskFilter filter={filter} setFilter={setFilter} />
          <TaskSort sort={sort} setSort={setSort} />
        </div>

        {/* --- DYNAMIC GRID SYSTEM --- */}
        {/* Mobile: 1 col | Tablet: 2 cols | Large Screen: 3 cols */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {processedTasks.length > 0 ? (
            processedTasks.map((t) => (
              <TaskItem
                key={t.id}
                task={t}
                onEdit={setModalTask}
                onDelete={remove}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-slate-400 font-medium italic">
              No tasks matched your criteria...
            </div>
          )}
        </div>

        {modalTask && (
          <TaskForm
            task={modalTask}
            onSave={(data) => {
              data.id ? update(data) : add(data);
              setModalTask(null);
            }}
            onClose={() => setModalTask(null)}
          />
        )}
      </div>
    </div>
  );
};

export default TaskApp;
