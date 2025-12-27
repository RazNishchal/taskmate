export const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:border-indigo-400 ${className}`}
  >
    {children}
  </div>
);
