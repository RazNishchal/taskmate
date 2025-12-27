export const Button = ({
  onClick,
  children,
  variant = "primary",
  className = "",
}) => {
  const styles =
    variant === "primary"
      ? "bg-indigo-600 text-white shadow-lg"
      : "bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200";
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-2xl font-bold transition active:scale-95 ${styles} ${className}`}
    >
      {children}
    </button>
  );
};
