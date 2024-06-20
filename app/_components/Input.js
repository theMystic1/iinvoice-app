"use client";

import { useDarkMode } from "../_contexts/DarkModeContext";

function Input({
  type = "text",
  placeholder,
  label,
  defaultValue,
  name,
  cat,
  children,
  onClick,
  className,
}) {
  const { isDarkMode } = useDarkMode();
  return (
    <div className="flex flex-col gap-2 w-full mb-8">
      <label className="text-accentPink-400">{label}</label>

      {cat === "datePicker" ? (
        <div
          className="rounded-md px-2 h-[60px]  py-2 border border-accentPink-400 w-full flex justify-between items-center relative font-bold"
          onClick={onClick}
        >
          {children}
        </div>
      ) : cat === "p" ? (
        <span
          className={`text-accentPink-400 flex items-center h-[60px]  py-2 ${className}`}
        >
          {children}
        </span>
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          className={`rounded-md px-2 h-[60px]  py-2 border border-accentPink-400 w-full font-bold ${
            isDarkMode ? "bg-darkMode-primary" : "bg-lightMode-primary"
          }`}
          defaultValue={defaultValue}
          required
          name={name}
        />
      )}
    </div>
  );
}

export default Input;
