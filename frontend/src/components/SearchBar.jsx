import React from "react";
import { IoMdClose } from "react-icons/io";
import { FaMagnifyingGlass } from "react-icons/fa6";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div
      className="w-full max-w-md flex items-center px-3 py-2 rounded-full
                 bg-[#EDEDE9] dark:bg-gray-800
                 border border-gray-200 dark:border-gray-700
                 shadow-md hover:shadow-lg transition-all duration-200
                 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-400"
    >
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full bg-transparent text-sm
                   text-gray-900 dark:text-gray-100
                   placeholder-gray-400 dark:placeholder-gray-500
                   outline-none px-2"
        value={value}
        onChange={onChange}
      />

      {/* Clear (X) Button */}
      {value && (
        <IoMdClose
          data-testid="clear-icon"
          className="text-xl ml-1 mr-2
                     text-gray-500 dark:text-gray-300
                     cursor-pointer hover:text-red-500 dark:hover:text-red-400
                     transition-colors duration-200"
          onClick={onClearSearch}
        />
      )}

      {/* Search Icon */}
      <FaMagnifyingGlass
        data-testid="search-icon"
        className="text-lg mr-1 text-indigo-500 dark:text-gray-300
                   cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400
                   transition-colors duration-200"
        // onClick={handleSearch}
        
      />
    </div>
  );
};

export default SearchBar;
