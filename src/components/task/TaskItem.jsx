import { Card } from "../common/Card";

export const TaskItem = ({ task, onEdit, onDelete }) => {
  const isDone = task.status === "Done";

  return (
    <Card className="flex flex-col h-full justify-between gap-6 group transition-all duration-300">
      <div className="w-full">
        {/* Status Badge & Date */}
        <div className="flex justify-between items-start mb-3">
          <span
            className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider ${
              isDone
                ? "bg-green-100 text-green-600 dark:bg-green-900/30"
                : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 animate-pulse"
            }`}
          >
            {task.status}
          </span>
          <span className="text-[11px] text-slate-400 font-bold">
            📅 {task.dueDate}
          </span>
        </div>

        {/* Task Title */}
        <h3
          className={`font-bold text-lg leading-tight transition-all ${
            isDone
              ? "line-through text-slate-300 dark:text-slate-600"
              : "text-slate-800 dark:text-white"
          }`}
        >
          {task.title}
        </h3>
      </div>

      {/* Action Buttons - Always at the bottom */}
      <div className="flex gap-3 w-full border-t border-slate-50 dark:border-slate-800 pt-4">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 text-sm font-black py-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-colors"
        >
          EDIT
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 text-sm font-black py-2 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors"
        >
          DELETE
        </button>
      </div>
    </Card>
  );
};
