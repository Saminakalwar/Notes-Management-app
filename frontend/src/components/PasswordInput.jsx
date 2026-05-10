import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({ id, name, value, onChange, placeholder, autoComplete}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (

    
    <div className="relative w-full">

       <label htmlFor={id || "password"} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Your password
      </label>
            {/* <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required /> */}
      <div className="relative flex items-center">
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || "••••••••"}
        type={showPassword ? "text" : "password"}
        className="input-box pr-10"

      //  className="bg-[#EDEDE9] border border-gray-300 text-gray-900 text-sm rounded-lg 
      //                focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10 
      //                dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        // className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
        required
        // autoComplete={autoComplete}
      />

{/* Eye Icon */}
<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  className="absolute right-3 text-gray-400 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
  style={{ top: '50%', transform: 'translateY(-50%)' }}
>
          {showPassword ? (
            <FaRegEye size={16} />
          ) : (
            <FaRegEyeSlash size={16} />
          )}
        </button>

      </div>
    </div>
  );
};

export default PasswordInput;
