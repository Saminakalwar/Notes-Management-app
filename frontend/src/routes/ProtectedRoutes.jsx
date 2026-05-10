import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  // If token exists but user is null -> refresh page or redirect
const token = localStorage.getItem("token");
if (!loading && token && !user) {
  return <Navigate to="/login" replace />;
}

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 dark:text-gray-300">
        Loading your workspace...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoutes;

// const ProtectedRoutes = ({ children }) => {
//   const { user, loading } = useAuth();

//   // ✅ show loader while restoring user
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-500">
//         Loading...
//       </div>
//     );
//   }

//   // ✅ redirect if not logged in
//   if (!user) return <Navigate to="/login" replace />;

//   return children;
// };
















// import React from 'react'
// import useAuth from '../hooks/useAuth';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoutes = ({children}) => {
//     const {user} = useAuth();


//     //if no user => redirect to login
//     if(!user){
//         return <Navigate to= "/login"/>
//     }
//   return children;
// }

// export default ProtectedRoutes;
