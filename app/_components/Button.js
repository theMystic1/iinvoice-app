"use client";

import { useDarkMode } from "../_contexts/DarkModeContext";

function Button({ type, size, children, onClick }) {
  const { isDarkMode } = useDarkMode();

  if (type === "draft")
    return (
      <button
        className="bg-accentPink-500 text-accentPink-400 md:px-4 py-2 md:text-lg text-sm px-2  font-bold rounded-2xl"
        onClick={onClick}
      >
        {children}
      </button>
    );
  return (
    <button
      className={`${
        type === "invoice"
          ? "flex bg-accentPink-200 items-center gap-4 text-lightMode-primary"
          : type === "danger"
          ? "bg-accentRed-100 text-lightMode-primary"
          : ` ${
              isDarkMode
                ? "bg-accentPink-500"
                : "bg-accentPink-0 text-accentPink-400"
            }`
      } rounded-2xl md:rounded-[40px] md:px-4 py-2 text-sm px-2 md:text-lg font-bold`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default Button;
