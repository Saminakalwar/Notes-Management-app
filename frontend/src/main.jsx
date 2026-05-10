import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { NotesProvider } from "./contexts/NotesContext";
import { BrowserRouter } from "react-router-dom";
import { ProfileProvider } from "./contexts/ProfileContext";
import "./index.css"; 

// Ensure app-wide theme class is set before React renders pages that don't include Navbar
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <ProfileProvider>
            <App />
          </ProfileProvider>
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>
);















// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { AuthProvider } from "./contexts/AuthContext";
// import { NotesProvider } from "./contexts/NotesContext";
// import { BrowserRouter } from "react-router-dom";
// import { ProfileProvider } from "./contexts/ProfileContext";
// import "./index.css"; 

// // Ensure app-wide theme class is set before React renders pages that don't include Navbar
// const savedTheme = localStorage.getItem("theme");
// if (savedTheme === "dark") {
//   document.documentElement.classList.add("dark");
// } else {
//   document.documentElement.classList.remove("dark");
// }


// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>
//         <NotesProvider>
//           <ProfileProvider>
//             <App />
//           </ProfileProvider>
//         </NotesProvider>
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
// { "email":"samina@example.com", "password":"Password123!" }
