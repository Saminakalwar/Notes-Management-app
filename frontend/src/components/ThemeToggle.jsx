import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (localStorage.theme) return localStorage.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 
        ${theme === "dark" 
          ? "bg-gradient-to-tr from-yellow-400 to-orange-500 shadow-[0_0_10px_rgba(255,200,50,0.7)]" 
          : "bg-gradient-to-tr from-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(50,100,255,0.5)]"
        }`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <FaSun className="text-white w-5 h-5 animate-spin-slow" />
      ) : (
        <FaMoon className="text-yellow-200 w-5 h-5 animate-pulse" />
      )}
    </button>
  );
};

export default ThemeToggle;
