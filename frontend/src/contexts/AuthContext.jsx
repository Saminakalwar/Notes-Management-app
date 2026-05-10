import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    //restore user from Local Storage if availbale
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  // Keep localStorage and state in sync
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);


  // useEffect(()=>{
  //   const token = localStorage.getItem("token");
  //   if(token && !user){
  //     console.log("Token found, fetching user info once at startup...");
  //     getUserInfo();
  //   }
  // },[])

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token && !user) {
    console.log("Token found, fetching user info once at startup...");
    getUserInfo().finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);

  //  Login
const login = async (email, password) => {
  // console.log(email);
  try{
  const res = await API.post("/auth/login", { email, password });
  if(res.data?.user){
  console.log("Auth.Login response:", res.data.user);
  setUser(res.data.user);
  // const { token, user } = res.data;
  localStorage.setItem("token", res.data.token);
  // return user;
  }
}
catch(error){
    console.error("Login error:", error);
    throw error;
}

};


  //  Register
  const register = async (username, email, password) => {
try{
    const res = await API.post("/auth/register", { username, email, password });
    // const { token, user } = res.data;
    if(res.data?.user){
      console.log("Auth.register response: ", res.data.user);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    }
}
catch(error){
    console.error("Registration error: ", error);
    throw error;
}
  };

  // Get logged-in user info
  const getUserInfo = async () => {
    try {
      const res = await API.get("/auth/get-user");

      if (res.data?.user) {
        console.log("Auth.getUserInfo response: ", res.data.user);
        setUser(res.data.user);
        return res.data.user;
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      logout();
    }
  };

  //  Logout
  const logout = () => {
    console.log("Logging out...");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserInfo, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
