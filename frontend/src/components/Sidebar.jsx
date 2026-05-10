import React from "react";
import { NavLink } from "react-router-dom";
import { FaStickyNote, FaUser, FaHome, FaBars ,FaUpload, FaDownload} from "react-icons/fa";

export default function Sidebar({ collapsed, setCollapsed, exportNotes, importNotes }) {
  const navItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Profile", icon: <FaUser />, path: "/profile" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen ${
        collapsed ? "w-20" : "w-64"
      } bg-[#D6CCC2] dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col shadow-md transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <FaStickyNote className="text-[#8C7E73] dark:text-indigo-500 text-xl" />
          {!collapsed && <h1 className="text-lg font-semibold">Notes App</h1>}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg text-gray-500 hover:text-indigo-500 transition-colors"
        >
          <FaBars />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 mt-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#8C7E73] dark:bg-indigo-500 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:bg-[#EDEDE9] dark:hover:bg-gray-700 hover:text-indigo-500"
              }`
            }
            title={collapsed ? item.name : ""}
          >
            <span className="text-lg">{item.icon}</span>
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Export / Import */}
      <div className="mt-4 mx-2 space-y-1">
        <button
          onClick={exportNotes}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium 
                     text-gray-600 dark:text-gray-300 
                     hover:bg-[#EDEDE9] dark:hover:bg-gray-700 
                     hover:text-indigo-500 transition-all duration-200"
        >
          <FaUpload className="text-lg" />
          {!collapsed && <span>Export Notes</span>}
        </button>

        <button
          onClick={() => document.getElementById("import-file").click()}
          className="flex items-center gap-3 px-4 py-2.5 w-full rounded-lg text-sm font-medium 
                     text-gray-600 dark:text-gray-300 
                     hover:bg-[#EDEDE9] dark:hover:bg-gray-700 
                     hover:text-indigo-500 transition-all duration-200"
        >
          <FaDownload className="text-lg" />
          {!collapsed && <span>Import Notes</span>}
        </button>

        <input
          id="import-file"
          type="file"
          accept=".json"
          className="hidden"
          onChange={(e) => importNotes(e.target.files[0])}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 text-center">
        {!collapsed && "© 2025 NotesApp"}
      </div>
    </aside>
  );
}
