import React, { useState } from "react";
import API from "../services/api";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.message || "Password reset link sent to your email!");
    } catch (err) {
      setError(err.response?.data?.message || "Error sending reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#F5EBE0] dark:bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-[#E3D5CA] dark:bg-gray-800 shadow-xl rounded-2xl w-[420px] p-6 relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition"
        >
          ✖
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-5">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="input-label">Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-box"
            required
          />

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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;













// import React, { useState } from "react";
// import API from "../services/api";

// const ForgotPasswordModal = ({ open, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   if (!open) return null;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setMessage(null);

//     try {
//       const res = await API.post("/auth/forgot-password", { email });
//       setMessage(res.data.message || "Password reset link sent to your email!");
//     } catch (err) {
//       setError(err.response?.data?.message || "Error sending reset link.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-gray-100 bg-opacity-90 flex items-center justify-center z-50 transition-opacity animate-fadeIn"
//     >
//       <div className="bg-white shadow-xl rounded-2xl w-[420px] p-6 relative animate-slideUp">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
//         >
//           ✖
//         </button>

//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
//           Forgot Password
//         </h2>
//         <p className="text-gray-600 text-center mb-5">
//           Enter your registered email and we’ll send you a reset link.
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           <div>
//             <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Email Address
//             </label>
//             <input
//               type="email"
//               name="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//               required
//             />
//           </div>

//           {error && <p className="text-red-500 text-sm">{error}</p>}
//           {message && <p className="text-green-600 text-sm">{message}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordModal;
