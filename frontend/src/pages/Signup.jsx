import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import PasswordInput from '../components/PasswordInput';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!username) return setError("Please enter your name");
    if (!email) return setError("Please enter your email");
    if (!password) return setError("Please enter your password");
    if (!validateEmail(email)) return setError("Please enter a valid email address");

    setError(null);
    setLoading(true);

    try {
      await register(username, email, password);
      toast.success("User registered successfully");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
     <div className="flex justify-center items-center min-h-screen">

        {/* <div className="w-full max-w-sm bg-[#E3D5CA] border border-gray-200 rounded-2xl shadow-xl sm:p-6 p-5 dark:bg-gray-800 dark:border-gray-700"> */}
       <div className="w-full max-w-sm bg-[#E3D5CA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl sm:p-6 p-5 transition-colors duration-300">

          <form onSubmit={handleSignUp} className="space-y-3">
            <h5 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
              Create Account
            </h5>

            {/* Username */}
            <div>
              <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='input-box'
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='input-box'
                required
              />
            </div>

            {/* Password */}
            <div>
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // autoComplete="new-password"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-[#8C7E73] hover:bg-[#8C7E80] 
                         focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                         transition duration-200 ease-in-out"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>

            {/* Redirect */}
            <div className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;













































































// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { validateEmail } from '../utils/helper';
// import PasswordInput from '../components/PasswordInput';
// import Navbar from '../components/Navbar';
// import useAuth from '../hooks/useAuth';

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     if (!username) return setError("Please enter your name");
//     if (!email) return setError("Please enter your email");
//     if (!password) return setError("Please enter your password");
//     if (!validateEmail(email)) return setError("Please enter a valid email address");

//     setError(null);
//     setLoading(true);

//     try {
//       await register(username, email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       alert(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//      <div className="flex justify-center items-center min-h-screen">

//         {/* <div className="w-full max-w-sm bg-[#E3D5CA] border border-gray-200 rounded-2xl shadow-xl sm:p-6 p-5 dark:bg-gray-800 dark:border-gray-700"> */}
//        <div className="w-full max-w-sm bg-[#E3D5CA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl sm:p-6 p-5 transition-colors duration-300">

//           <form onSubmit={handleSignUp} className="space-y-3">
//             <h5 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
//               Create Account
//             </h5>

//             {/* Username */}
//             <div>
//               <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
//                 Username
//               </label>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 placeholder="Username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className='input-box'
//                 // className="bg-[#EDEDE9] border border-gray-300 text-gray-900 text-sm rounded-lg 
//                 //            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
//                 //            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                 // autoComplete="username"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className='input-box'
//                 // className="bg-[#EDEDE9] border border-gray-300 text-gray-900 text-sm rounded-lg 
//                 //            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
//                 //            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
//                 // autoComplete="email"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <PasswordInput
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 // autoComplete="new-password"
//               />
//               {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full text-white bg-[#8C7E73] hover:bg-[#8C7E80] 
//                          focus:ring-4 focus:outline-none focus:ring-blue-300 
//                          font-medium rounded-lg text-sm px-5 py-2.5 text-center 
//                          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
//                          transition duration-200 ease-in-out"
//             >
//               {loading ? 'Signing up...' : 'Sign up'}
//             </button>

//             {/* Redirect */}
//             <div className="text-center text-sm text-gray-500 dark:text-gray-300 mt-2">
//               Already have an account?{" "}
//               <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
//                 Login
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;



















// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { validateEmail } from '../utils/helper';
// import PasswordInput from '../components/PasswordInput';
// import Navbar from '../components/Navbar';
// import useAuth from '../hooks/useAuth';

// const Signup = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const {register} = useAuth();

//   const navigate = useNavigate();

//   const handleSignUp = async(e) => {
//     e.preventDefault();

//     if (!username) {
//       setError("Please enter your name");
//       return;
//     }
//      if (!email) {
//       setError("Please enter your email");
//       return;
//     }
//      if (!password) {
//       setError("Please enter your password");
//       return;
//     }

//     if (!validateEmail(email)) {
//     setError("Please enter a valid email address");
//     return;
//     }

//     setError(null);
//     setLoading(true);
   
//     //SignUp API call
//     try{
//       await register(username, email, password);
//       navigate('/dashboard');
//     }
//     catch(err){
//       alert(err.response?.data?.message || 'Registration failed')
//     }finally{
//       setLoading(false);
//     }
    
//   };

//   return (
//     <>
//     <Navbar/>
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
//         <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

//         <form onSubmit={handleSignUp} className="space-y-4">
          
//           <input
//             id="username"
//             username="username"
//             type="text"
//             placeholder="Username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
//             required
//             autoComplete="username"
//           />
//           <input
//             id="email"
//             username="email"
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
//             required
//              autoComplete="email"
//           />

//             <PasswordInput id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}  autoComplete="new-password" />

//           {error && <p className="text-red-500 text-sm">{error}</p>}

//           <button
//             type="submit"
//             className="btn-primary"
//           >
//             Sign Up
//           </button>
//         <p className="mt-6 text-sm text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Login
//           </Link>
//         </p>
//         </form>


//       </div>
//     </div>
//     </>
//   );
// };

// export default Signup;