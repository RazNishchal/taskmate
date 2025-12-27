export const TaskFilter = ({ filter, setFilter }) => (
  <select
    className="p-3 bg-slate-100 dark:bg-slate-800 dark:text-white rounded-xl outline-none"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
  >
    <option value="All">All Status</option>
    <option value="Pending">Pending</option>
    <option value="Done">Done</option>
  </select>
);
