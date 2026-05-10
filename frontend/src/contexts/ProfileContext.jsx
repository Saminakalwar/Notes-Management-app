// ✅ src/context/ProfileContext.jsx
import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useNotes from "../hooks/useNotes";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user, logout } = useAuth();
  const { notes } = useNotes();

  const [profileData, setProfileData] = useState({
    fullname: "",
    gender: "",
    country: "Pakistan",
    language: "English",
    timezone: "Asia/Karachi",
    linkedin: "",
    github: "",
  });

  const [profilePic, setProfilePic] = useState(null);
  const [count, setCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => setCount(notes.length), [notes]);

  useEffect(() => {
    if (user && !profileData.fullname) {
      fetchProfile();
    } else if (!user) {
      resetProfile();
    }
  }, [user]);

  // ✅ Unified Fetch (data + picture + error handling)
  const fetchProfile = async () => {
    if (!user) return;
    try {
      const res = await API.get("/profile");
      const { user: userData } = res.data;
      if (userData?.profileData) setProfileData(userData.profileData);
      if (userData?.profilePic) setProfilePic(userData.profilePic);
    } catch (err) {
      console.error("Error fetching profile:", err);
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else {
        toast.error("Failed to fetch profile. Retrying...");
        setTimeout(fetchProfile, 3000);
      }
    }
  };

  const updateProfile = async (data) => {
    setSaving(true);
    try {
      const res = await API.put("/profile", { profileData: data });
      setProfileData(res.data.user.profileData);
      toast.success("Profile updated successfully!");
      return true;
    } catch (err) {
      console.error("Failed to save changes:", err);
      toast.error("Failed to save changes!");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const uploadProfilePic = async (file, onSuccess) => {
    if (!file) return;
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      });
      const formData = new FormData();
      formData.append("profilePic", compressed);

      const res = await API.put("/profile-pic", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 60000,
      });
      setProfilePic(res.data.profilePic);
      toast.success("Profile picture updated!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error uploading profile picture:", err);
      toast.error("Error uploading picture.");
    }
  };

  const removeProfilePic = async (onSuccess) => {
    if (!window.confirm("Remove your profile picture?")) return;
    try {
      await API.delete("/profile-pic");
      setProfilePic(null);
      toast.success("Profile picture removed!");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error removing profile picture:", err);
      toast.error("Error removing profile picture.");
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm("⚠️ Are you sure you want to delete your account permanently?")) return;
    try {
      await API.delete("/delete-account");
      toast.success("Account deleted successfully!");
      logout();
    } catch (err) {
      console.error("Error deleting account:", err);
      toast.error("Error deleting account.");
    }
  };

  // ✅ Reset profile + toast cleanup
  const resetProfile = () => {
    toast.dismiss(); // clear toasts
    setProfilePic(null);
    setProfileData({
      fullname: "",
      gender: "",
      country: "Pakistan",
      language: "English",
      timezone: "Asia/Karachi",
      linkedin: "",
      github: "",
    });
    setCount(0);
    setSaving(false);
    setLoading(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        profilePic,
        setProfilePic,
        count,
        saving,
        loading,
        fetchProfile,
        updateProfile,
        uploadProfilePic,
        removeProfilePic,
        deleteAccount,
        resetProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};































// below version is also ok , just to reduce redundancy , toast clearance etc above version
// // ✅ src/context/ProfileContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import API from "../services/api";
// import imageCompression from "browser-image-compression";
// import toast from "react-hot-toast";
// import useAuth from "../hooks/useAuth";
// import useNotes from "../hooks/useNotes";

// export const ProfileContext = createContext();

// export const ProfileProvider = ({ children }) => {
//   const { user, logout } = useAuth();
//   const { notes } = useNotes();

//   const [profileData, setProfileData] = useState({
//     fullname: "",
//     gender: "",
//     country: "Pakistan",
//     language: "English",
//     timezone: "Asia/Karachi",
//     linkedin: "",
//     github: "",
//   });
  
//   const [profilePic, setProfilePic] = useState(null);
//   const [count, setCount] = useState(0);
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // setCount(notes?.length || 0);
//     setCount(notes.length);
//   }, [notes]);

//   useEffect(() => {
//   if (user && !profileData.fullname) {
//     fetchProfile();
//   } else if (!user) {
//     resetProfile();
//   }
// }, [user]);

//   // ✅ Fetch full profile
//   const fetchProfile = async () => {
//     if (!user) return;
//     try {
//       const res = await API.get("/profile");
//       if (res.data.user?.profileData) setProfileData(res.data.user.profileData);
//       if (res.data.user?.profilePic) setProfilePic(res.data.user.profilePic);
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     }
//   };

//   // ✅ Fetch profile picture only
//   const fetchProfilePic = async () => {
//     if (!user) return;
//     try {
//       const res = await API.get("/profile-pic");
//       if (res.data.profilePic) setProfilePic(res.data.profilePic);
//     } catch (err) {
//       console.error("Error fetching profile picture:", err);
//     }
//   };

//   // ✅ Update profile data
//   const updateProfile = async (data) => {
//     setSaving(true);
//     try {
//       const res = await API.put("/profile", { profileData: data });
//       setProfileData(res.data.user.profileData);
//       toast.success("Profile updated successfully!");
//       return true;
//     } catch (err) {
//       console.error("Failed to save changes:", err);
//       toast.error("Failed to save changes!");
//       return false;
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ✅ Upload profile picture
//   const uploadProfilePic = async (file, onSuccess) => {
//     if (!file) return;
//     try {
//       const compressed = await imageCompression(file, {
//         maxSizeMB: 0.5,
//         maxWidthOrHeight: 800,
//         useWebWorker: true,
//       });

//       const formData = new FormData();
//       formData.append("profilePic", compressed);

//       const res = await API.put("/profile-pic", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//         timeout: 60000,
//       });
//       setProfilePic(res.data.profilePic);
//       toast.success("Profile picture updated!");
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       console.error("Error uploading profile picture:", err);
//       toast.error("Error uploading picture.");
//     }
//   };

//   // ✅ Remove profile picture
//   const removeProfilePic = async (onSuccess) => {
//     if (!window.confirm("Remove your profile picture?")) return;
//     try {
//       await API.delete("/profile-pic");
//       setProfilePic(null);
//       toast.success("Profile picture removed!");
//       if (onSuccess) onSuccess();
//     } catch (err) {
//       console.error("Error removing profile picture:", err);
//       toast.error("Error removing profile picture.");
//     }
//   };

//   // ✅ Delete account
//   const deleteAccount = async () => {
//     if (!window.confirm("⚠️ Are you sure you want to delete your account permanently?")) return;
//     try {
//       await API.delete("/delete-account");
//       toast.success("Account deleted successfully!");
//       logout();
//     } catch (err) {
//       console.error("Error deleting account:", err);
//       toast.error("Error deleting account.");
//     }
//   };

//   // ✅ Reset all profile states on logout
//   const resetProfile = () => {
//     setProfilePic(null);
//     setProfileData({
//       fullname: "",
//       gender: "",
//       country: "Pakistan",
//       language: "English",
//       timezone: "Asia/Karachi",
//       linkedin: "",
//       github: "",
//     });
//     setCount(0);
//     setSaving(false);
//     setLoading(false);
//   };

//   // ✅ Fetch profile when user changes
// //   useEffect(() => {
// //     if (user) {
// //       fetchProfile();
// //     } else {
// //       resetProfile(); // 🔥 Clear data if user becomes null (after logout)
// //     }
// //   }, [user]);


//   return (
//     <ProfileContext.Provider
//       value={{
//         profileData,
//         setProfileData,
//         profilePic,
//         setProfilePic,
//         count,
//         saving,
//         loading,
//         fetchProfile,
//         updateProfile,
//         uploadProfilePic,
//         removeProfilePic,
//         deleteAccount,
//         resetProfile, // ✅ Export it
//       }}
//     >
//       {children}
//     </ProfileContext.Provider>
//   );
// };


