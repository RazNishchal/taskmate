import React, { useState } from "react";
import { Button } from "./common/Button";

export const TaskForm = ({ task, onSave, onClose }) => {
  const [form, setForm] = useState(task);
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="bg-white dark:bg-slate-900 p-8 rounded-3xl w-full max-w-md shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          Task Details
        </h2>
        <div className="space-y-4">
          <input
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="date"
            required
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          />
          <select
            className="w-full p-3 bg-slate-50 dark:bg-slate-800 dark:text-white rounded-xl"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="flex gap-3 mt-8">
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="flex-1">
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};
