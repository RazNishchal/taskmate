import React from "react";

export const TaskSort = ({ sort, setSort }) => {
  return (
    <div className="flex-1">
      <select
        className="w-full p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl outline-none cursor-pointer border-none ring-1 ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-indigo-500 transition-all"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="none">Sort: Default (All)</option>
        <option value="date">Sort: Due Date</option>
        <option value="name">Sort: Alphabetical (A-Z)</option>
      </select>
    </div>
  );
};
