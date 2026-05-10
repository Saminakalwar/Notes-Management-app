import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";
import useAuth from "../hooks/useAuth";


const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { logout } = useAuth();


  const handleReset = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await API.post(`/auth/reset-password/${token}`, { newPassword });
      // setMessage(res.data.message || "Password reset successful! Redirecting...");
      // setTimeout(() => navigate("/login"), 2500);

      setMessage(res.data.message || "Password reset successful! Redirecting...");

        // VERY IMPORTANT: clear auth completely
        logout(); // ⬅ clear token + user from context

        setTimeout(() => navigate("/login"), 1500);


    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F5EBE0] dark:bg-gray-900 animate-fadeIn">
      <div className="bg-[#E3D5CA] dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md animate-slideUp">
        <h2 className="text-2xl font-semibold text-center mb-3">Reset Password</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
          Enter your new password to regain access to your Notes App account.
        </p>

        <form onSubmit={handleReset}>
          <div>
            <label className="input-label">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-box"
              required
            />
          </div>

          <div>
            <label className="input-label">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-box"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-600 text-sm">{message}</p>}

          <button
            type="submit"
            disabled={loading}
             className="w-full text-white bg-[#8C7E73] hover:bg-[#8C7E80] 
                         focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 mt-5 text-center 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                         transition duration-200 ease-in-out"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;















// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import API from "../services/api";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const { token } = useParams();
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const handleReset = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setMessage(null);

//     if (newPassword.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return;
//     }
//     if (newPassword !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await API.post(`/auth/reset-password/${token}`, { newPassword });
//       setMessage(res.data.message || "Password reset successful! Redirecting...");
//       setTimeout(() => navigate("/login"), 2500);
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid or expired reset link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
//           Reset Password
//         </h2>
//         <p className="text-gray-500 text-center mb-6">
//           Enter your new password to regain access to your Notes App account.
//         </p>

//         <form onSubmit={handleReset} className="space-y-4">
//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               New Password
//             </label>
//             <input
//               type="password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {message && <p className="text-green-600 text-sm">{message}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition"
//           >
//             {loading ? "Resetting..." : "Reset Password"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
