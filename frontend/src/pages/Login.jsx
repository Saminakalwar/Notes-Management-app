import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import PasswordInput from '../components/PasswordInput';
import { validateEmail } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const {login} = useAuth(); //custom hook
    const navigate = useNavigate(); // hook

    const handleLogin = async(e)=>{
      e.preventDefault(); //prevent the default behavior of form submission from reloading the page on user reclick

      if (!email) return setError("Please enter the email address.");
      if (!password) return setError("Please enter the password.");
      if (!validateEmail(email)) return setError("Please enter a valid email address");

      setError(null);
      setLoading(true);

      // Login API call
      try{
        await login(email, password);
        toast.success("User Logged in successfully");
        navigate('/dashboard');
      }
      catch(err){
      // alert(err.response?.data?.message || 'Login failed');
       setError(err.response?.data?.message || "Login failed");
      }
      finally {
          setLoading(false);
        }
    }

  return (
    <>
      <Navbar />

      {/* Centered container */}
      <div className="flex justify-center items-center min-h-screen">

      <div className="w-full max-w-sm bg-[#E3D5CA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl sm:p-6 p-5 transition-colors duration-300">

          <form onSubmit={handleLogin} className="space-y-5">
            <h5 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
              Log in to your account
            </h5>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-box"
                required
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
          
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Remember me + Forgot Password */}
            <div className="flex items-center justify-between">
             
              <button
                type="button"
                onClick={() => setOpenModal(true)}
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white bg-[#8C7E73] hover:bg-[#8C7E80] 
                         focus:ring-4 focus:outline-none focus:ring-blue-300 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                         dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                         transition duration-200 ease-in-out"
            >
              {loading ? "Logging in..." : "Login to your account"}
            </button>

            {/* Register link */}
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
              Not registered?{" "}
              <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">
                Create account
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  )

}
export default Login



















































































































// import React from 'react'
// import { useState } from 'react'
// import { Link } from 'react-router-dom';
// import PasswordInput from '../components/PasswordInput';
// import { validateEmail } from '../utils/helper';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
// import useAuth from '../hooks/useAuth';
// import ForgotPasswordModal from '../components/ForgotPasswordModal';

// const Login = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [openModal, setOpenModal] = useState(false);

//     const {login} = useAuth(); //custom hook
//     const navigate = useNavigate(); // hook

//     const handleLogin = async(e)=>{
//       e.preventDefault(); //prevent the default behavior of form submission from reloading the page on user reclick

//       if (!email) return setError("Please enter the email address.");
//       if (!password) return setError("Please enter the password.");
//       if (!validateEmail(email)) return setError("Please enter a valid email address");

//       setError(null);
//       setLoading(true);

//       // Login API call
//       try{
//         await login(email, password);
//         navigate('/dashboard');
//       }
//       catch(err){
//       alert(err.response?.data?.message || 'Login failed');
//       }
//       finally {
//           setLoading(false);
//         }
//     }

//   return (
//     <>
//       <Navbar />

//       {/* Centered container */}
//       <div className="flex justify-center items-center min-h-screen">

//       {/* <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"> */}
// {/* <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex justify-center items-center"> */}
//         {/* <div className="w-full max-w-sm p-5 sm:p-6 md:p-8 bg-[#E3D5CA] border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"> */}
//       <div className="w-full max-w-sm bg-[#E3D5CA] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl sm:p-6 p-5 transition-colors duration-300">

//           <form onSubmit={handleLogin} className="space-y-5">
//             <h5 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
//               Log in to your account
//             </h5>

//             {/* Email */}
//             <div>
//               <label
//                 htmlFor="email"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Your email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 placeholder="name@company.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="input-box"

//                 // className="bg-[#EDEDE9] border border-gray-300 text-gray-900 text-sm rounded-lg 
//                 //            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
//                 //            dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
//                 required
//                 autoComplete="email"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               {/* <label
//                 htmlFor="password"
//                 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//               >
//                 Your password
//               </label> */}
//               <PasswordInput
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 autoComplete="current-password"
//               />
//               {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
//             </div>

//             {/* Remember me + Forgot Password */}
//             <div className="flex items-center justify-between">
             
//               <button
//                 type="button"
//                 onClick={() => setOpenModal(true)}
//                 className="text-sm text-blue-700 hover:underline dark:text-blue-500"
//               >
//                 Forgot password?
//               </button>
//             </div>

//             {/* Submit button */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full text-white bg-[#8C7E73] hover:bg-[#8C7E80] 
//                          focus:ring-4 focus:outline-none focus:ring-blue-300 
//                          font-medium rounded-lg text-sm px-5 py-2.5 text-center 
//                          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
//                          transition duration-200 ease-in-out"
//             >
//               {loading ? "Logging in..." : "Login to your account"}
//             </button>

//             {/* Register link */}
//             <div className="text-sm font-medium text-gray-500 dark:text-gray-300 text-center">
//               Not registered?{" "}
//               <Link to="/signup" className="text-blue-700 hover:underline dark:text-blue-500">
//                 Create account
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       <ForgotPasswordModal open={openModal} onClose={() => setOpenModal(false)} />
//     </>
//   )

// }
// export default Login




  // (
  //   <>
  //    <Navbar />
  //  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-25">

  //     <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
  //       <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
  //       <p className="text-center text-gray-500 mb-3">
  //           Enter your credentials to access Notes App Dashboard.
  //         </p>

  //       <form onSubmit={handleLogin} className="space-y-3">
  //         <input
  //           id="email"
  //           name="email"
  //           type="email"
  //           placeholder="Email"
  //           value={email}
  //           onChange={(e) => setEmail(e.target.value)}
  //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
  //           required
  //           autoComplete="email"
  //         />

  //         <PasswordInput id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value) }  autoComplete="current-password"/>

  //         {error && <p className="text-red-500 text-sm">{error}</p>}

  //         <button
  //             type="submit"
  //             className="btn-primary w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-60"
  //             disabled={loading}
  //           >
  //             {loading ? "Logging in..." : "Login"}

  //           </button>

  //            {/* 🔹 Forgot Password Link */}
  //           <div className="text-right mt-0">
  //             <button
  //               type="button"
  //               onClick={() => setOpenModal(true)}
  //               className="text-blue-500 hover:underline text-sm"
  //             >
  //               Forgot password?
  //             </button>
  //           </div>

  //       </form>
        
  //       <p className="mt-4 text-sm text-center">
  //         Not registered yet?{" "}
  //         <Link to="/signup" className="text-primary hover:underline">
  //           Create an Account
  //         </Link>
  //       </p>

  //     </div>
  //   </div>

  //   {/* 🔹 Forgot Password Modal */}
  //     <ForgotPasswordModal open={openModal} onClose={() => setOpenModal(false)} />

  //   </>
  // )



//   try{
//     const res = await API.post('/auth/login', {email, password});
//     // handle successful login response
//     if(res.data && res.data.token){
//      const { token, user } = res.data;// from response data object it will only fetch the token & user
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));
//     navigate('/dashboard');
//     }
//     else {
//         setError("Invalid login response.");
//       }
//   }
//   catch(error){
//     // handle Login Error
// // if (error.response && error.response.data && error.response.data.message) { //or
// if (error.response?.data?.message) {
//   setError(error.response.data.message);
// } else {
//   setError("An unexpected error occurred. Please try again.");
// }