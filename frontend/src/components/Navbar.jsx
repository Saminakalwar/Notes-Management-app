import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useNotes from "../hooks/useNotes";
import useProfile  from "../hooks/useProfile";
import SearchBar from "./SearchBar";

const Navbar = ({ collapsed = false }) => {
  const { user, logout } = useAuth();
  const { profilePic , resetProfile} = useProfile();
  const { searchNotes, fetchNotes, searchQuery, setSearchQuery } = useNotes();

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();

  const showSearch = location.pathname === "/dashboard";


  // Theme setup
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
  logout();        // clears token & auth data
  resetProfile();  // clears cached profile info
  navigate("/login");
};

  // useEffect(() => {
  //   if (!user) return;
  //   const delay = setTimeout(() => {
  //     if (searchQuery.trim()) searchNotes(searchQuery);
  //     else fetchNotes();
  //   }, 500);
  //   return () => clearTimeout(delay);
  // }, [searchQuery, user]);

  useEffect(() => {
  if (!user) return;

  // When searchQuery is empty → reload full notes
  if (!searchQuery.trim()) {
    fetchNotes();              // ⬅ reload full notes
    return;
  }

  // Otherwise → search after delay
  const delay = setTimeout(() => {
    searchNotes(searchQuery);
  }, 500);

  return () => clearTimeout(delay);
}, [searchQuery, user]);


  const handleSearch = async () => {
    if (searchQuery.trim()) await searchNotes(searchQuery);
    else await fetchNotes();
  };

  const onClearSearch = async () => {
    setSearchQuery("");
    await fetchNotes();
  };

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <nav
      className={`fixed top-0 right-0 ${
        user ? (collapsed ? "left-20" : "left-64") : "left-0"
      } 
      bg-[#D6CCC2] dark:bg-gray-800 
      text-gray-900 dark:text-gray-100 
      flex items-center justify-between px-6 py-3 
       border-b border-gray-200 dark:border-gray-700 
      z-40 transition-all duration-300`}
    >
      {!user && (
        <Link to="/login">
          <h2 className="text-xl font-medium text-gray-900 dark:text-white">
            Notes App
          </h2>
        </Link>
      )}

      {user && showSearch && (
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}

      {/* 🌗 Right Section */}
      <div className="ml-auto flex items-center gap-4">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {theme === "light" ? <BsMoon size={18} /> : <BsSun size={18} />}
        </button>

        {!user ? (
          <Link
            to="/login"
            className="text-sm font-medium text-indigo-600 hover:underline"
          >
            Login
          </Link>
        ) : (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropDownOpen(!dropDownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-gray-300 dark:bg-gray-600">
                {profilePic ? (
                  <img
                    src={profilePic?.url || "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-800 dark:text-white font-semibold">
                    {initials}
                  </span>
                )}
              </div>

<span className="gradient-animated text-sm font-semibold">{user?.username}</span>


              <MdKeyboardArrowDown
                className={`text-gray-600 dark:text-gray-300 text-lg transition-transform ${
                  dropDownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropDownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#F5EBE0] dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-600">
                  Account
                </div>

                <Link
                  to="/profile"
                  onClick={() => setDropDownOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Profile
                </Link>

                <button
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out?"))
                      handleLogout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center gap-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

















  // const { initialLoading } = useAuth();

  //  if (initialLoading) return null;  // wait for auth restore

// if (!user && !["/login", "/signup", "/reset-password", "/forgot-password"].includes(location.pathname)) {
//   return null;
// }





  // const handleLogout = () => {
  //   logout();
  //   navigate("/login");
  // };




// import React, { useState, useRef, useEffect } from "react";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { BsSun, BsMoon } from "react-icons/bs";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import SearchBar from "./SearchBar";
// import useNotes from "../hooks/useNotes";
// import { useLocation } from "react-router-dom";
// import API from "../services/api";


// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [dropDownOpen, setDropDownOpen] = useState(false);
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   const {searchNotes, fetchNotes} = useNotes();
//   const {searchQuery, setSearchQuery} = useNotes();

//   const location = useLocation();
// const showSearch = location.pathname === "/dashboard"; // ✅ only on dashboard

//   const [profilePic, setProfilePic] = useState(null);

// useEffect(() => {
//   if (!user) return;
//   (async () => {
//     try {
//       const res = await API.get("/profile-pic");
//       if (res.data.profilePic) setProfilePic(res.data.profilePic);
//     } catch (err) {
//       console.error("Error fetching navbar profile pic:", err);
//     }
//   })();
// }, [user]);


//   // Apply theme once 
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // Handle  outside click for dropdown
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropDownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   //debounced search only when user logged in 
//   useEffect(() => {
//   if (!user) return; // ✅ Run only when user logged in
//   const delay = setTimeout(() => {
//     if (searchQuery.trim()) {
//       searchNotes(searchQuery);
//     } else {
//       fetchNotes();
//     }
//   }, 500);

//   return () => clearTimeout(delay);
// }, [searchQuery, user]);

//    //handle search
  
// const handleSearch = async () => {
//   if (searchQuery.trim()) {
//     await searchNotes(searchQuery);
//   } else {
//     await fetchNotes();
//   }
// };


//   const onClearSearch = async ()=>{
//     setSearchQuery("");
//     await fetchNotes();
//   }

//   const initials = user?.username
//     ? user.username.split(" ").map((n) => n[0]).join("").toUpperCase()
//     : "U";

//   return (
//     <nav
//       className={`fixed top-0 right-0 ${
//         user ? "left-64" : "left-0"
//       } bg-white dark:bg-gray-800 flex items-center justify-between px-6 py-3 shadow-md z-40 transition-all duration-300`}
//     >
//       {/* ✅ Show logo only when user is NOT logged in */}
//       {!user && (
//         <Link to="/login">
//           <h2 className="text-xl font-medium text-gray-900 dark:text-white">
//             Notes App
//           </h2>
//         </Link>
//       )}

//       {user && showSearch && (
//         <SearchBar
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           handleSearch={handleSearch}
//           onClearSearch={onClearSearch}
//         />
//       )}


//       {/* Right section: theme + user menu */}
//       <div className="ml-auto flex items-center gap-4">
//         {/* 🌗 Theme Toggle */}
//         <button
//           onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//           className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
//         >
//           {theme === "light" ? <BsMoon size={18} /> : <BsSun size={18} />}
//         </button>

//         {!user ? (
//           <Link
//             to="/login"
//             className="text-sm font-medium text-blue-600 hover:underline"
//           >
//             Login
//           </Link>
//         ) : (
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setDropDownOpen(!dropDownOpen)}
//               className="flex items-center gap-2 focus:outline-none"
//             >

              
//           <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
//             {profilePic ? (
//               <img src={profilePic} alt="avatar" className="w-full h-full object-cover" />
//             ) : (
//               <span className="text-gray-700 dark:text-white font-semibold">
//                 {initials}
//               </span>
//             )}
//           </div>


//               <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                 {user?.username || "User"}
//               </span>
//               <MdKeyboardArrowDown
//                 className={`text-gray-600 dark:text-gray-300 text-lg transition-transform ${
//                   dropDownOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {dropDownOpen && (
//               <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-100 dark:border-gray-600">
//                 <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-100 dark:border-gray-600">
//                   Account
//                 </div>
//                 <Link
//                   to="/profile"
//                   onClick={() => setDropDownOpen(false)}
//                   className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
//                 >
//                   Profile
//                 </Link>

//                 <button
//                  onClick={() => {
//                     if (window.confirm("Are you sure you want to log out?")) {
//                       handleLogout();
//                     }
//                   }}

//                 className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// import React, { useState, useRef, useEffect } from "react";
// import { FaUserCircle } from "react-icons/fa";
// import { MdKeyboardArrowDown } from "react-icons/md";
// import { Link, useNavigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const [dropDownOpen, setDropDownOpen] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);

//   // Handle outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropDownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//     // Only render dropdown if user is authenticated
//   if (!user) {
//     return (
//       <nav className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between px-6 py-3 shadow-md z-50">
//         <Link to="/login">
//           <h2 className="text-xl font-medium text-black py-2">Notes App</h2>
//         </Link>
//       </nav>
//     );
//   }

//   const initials = user?.username
//     ? user.username.split(" ").map((n) => n[0]).join("").toUpperCase() : "U";

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between px-6 py-3 shadow-md z-50">
//       {/* App Logo / Title */}
//       <Link to="/dashboard">
//         <h2 className="text-xl font-medium text-black py-2">Notes App</h2>
//       </Link>

//       {/* User Dropdown */}
//       <div className="relative" ref={dropdownRef}>
//         <button
//           onClick={() => setDropDownOpen(!dropDownOpen)}
//           className="flex items-center gap-2 focus:outline-none"
//         >
//           <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold">
//             {initials}
//           </div>
//           <span className="text-sm font-medium text-gray-700">
//             {user?.username || "User"}
//           </span>

//           <MdKeyboardArrowDown
//             className={`text-gray-600 text-lg transition-transform ${
//               dropDownOpen ? "rotate-180" : ""
//             }`}
//           />
//         </button>

//         {/* Dropdown Menu */}
//         {dropDownOpen && (
//           <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100">
           
//             <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100 cursor-default">
//               Account
//             </div>

//             <Link
//               to="/profile"
//               onClick={() => setDropDownOpen(false)}
//               className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//               Profile
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-50 flex items-center gap-2">
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


    {/* // <svg className={`w-4 h-4 text-gray-600 transition-transform ${
    //     dropDownOpen ? "rotate-180" : ""
    //   }`}
    //   fill='none'
    //   stroke='currentColor'
    //   strokeWidth="2"
    //   viewBox='0 0 24 24'>
    //     <path strokeLinecap='round' strokeLinejoin='round'd="M19 9l-7 7-7-7"/>
    //   </svg> */}