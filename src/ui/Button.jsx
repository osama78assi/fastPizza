import { Link } from "react-router-dom";

/* eslint-disable */
function Button({ children, disabled, to, type, onClick, additionClass = "" }) {
  const base =
    "inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-200";

  const styles = {
    group: `${base} text-xs ${additionClass}`,
    primary: `${base} px-4 py-3 sm:px-6 sm:py-4 ${additionClass}`,
    small: `${base} p-1.5 text-xs sm:text-sm md:px-3 md:py-2.5 ${additionClass}`,
    round: `${base} py-1.5 px-2.5 text-xs sm:text-sm ${additionClass}`,
    secondary: `inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800  focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-200 px-4 py-2.5 sm:px-6 sm:py-3.5 ${additionClass}`,
  };
  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  return (
    <button
      className={styles[type]}
      disabled={disabled}
      onClick={(e) => (onClick ? onClick(e) : null)}
    >
      {children}
    </button>
  );
}

export default Button;
