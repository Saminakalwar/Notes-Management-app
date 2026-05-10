import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Layout from "./components/Layout";
import "./index.css";

const App = () => {
  return (
    <div className="min-h-screen bg-[#F5EBE0] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Routes>
        {/* ✅ Shared layout for protected routes */}
        <Route path="/" element={<Layout />}>
             <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
        </Route>

        {/* ✅ Public routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordModal />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;













































// import React from "react";
// import { Route, Routes, Navigate } from "react-router-dom";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import ForgotPasswordModal from "./components/ForgotPasswordModal";
// import ResetPassword from "./pages/ResetPassword";
// import ProtectedRoutes from "./routes/ProtectedRoutes";
// import Layout from "./components/Layout";
// import "./index.css";

// const App = () => {
//   return (
//     <div className="min-h-screen bg-[#F5EBE0] dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
//       <Routes>
//   {/* Public routes (priority) */}
//   <Route path="/signup" element={<Signup />} />
//   <Route path="/login" element={<Login />} />
//   <Route path="/forgot-password" element={<ForgotPasswordModal />} />
//   <Route path="/reset-password/:token" element={<ResetPassword />} />

//   {/* Protected layout + nested routes */}
//   <Route path="/" element={<Layout />}>
//     <Route index element={<Navigate to="/dashboard" replace />} />
//     <Route
//       path="dashboard"
//       element={
//         <ProtectedRoutes>
//           <Home />
//         </ProtectedRoutes>
//       }
//     />
//     <Route
//       path="profile"
//       element={
//         <ProtectedRoutes>
//           <Profile />
//         </ProtectedRoutes>
//       }
//     />
//     {/* Add other protected nested routes here */}
//   </Route>

//   {/* Optional: fallback 404 route */}
//   {/* <Route path="*" element={<NotFound />} /> */}
// </Routes>


//     </div>
//   );
// };

// export default App;






// import React from 'react'
// import Signup from './pages/Signup'
// import Login from './pages/Login'
// import { Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'
// import Profile from './pages/Profile'
// import ProtectedRoutes from './routes/ProtectedRoutes'
// import ForgotPasswordModal from './components/ForgotPasswordModal'
// import ResetPassword from './pages/ResetPassword'

// const App = () => {
//   return (
//    <Routes>
//     <Route path='/' element={<Signup/>}/>
//     <Route path="/signup" element={<Signup />} />
//     <Route path='/login' element={<Login/>}/>
//     <Route path="/forgot-password" element={<ForgotPasswordModal />} />
//     <Route path="/reset-password/:token" element={<ResetPassword />} />


//     {/* Protected Routes */}
//      <Route path='/dashboard' element={ <ProtectedRoutes> <Home/> </ProtectedRoutes>}/>
//       <Route path="/profile" element={<ProtectedRoutes> <Profile /> </ProtectedRoutes>} />

//    </Routes>
//   )
// }

// export default App
