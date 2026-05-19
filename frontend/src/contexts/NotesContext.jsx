import { createContext, useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fetching, setFetching] = useState(false);

  const fetchNotes = async () => {
    if (fetching) return; // prevent overlap
    try {
      setFetching(true);
      setLoading(true);
      const res = await API.get("/notes");
      // setNotes(res.data.notes || []);

      // Ensure pinned notes always appear first safely
      const sortedNotes = [...(res.data.notes || [])].sort((a, b) => {
        if (a.pinned === b.pinned) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        return a.pinned ? -1 : 1;
      });

      setNotes(sortedNotes);
    } catch (err) {
      console.error("error fetching notes", err);
      setError(err.response?.data?.message || "Failed to load notes");
      toast.error("Failed to load notes");
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const searchNotes = async (query) => {
    if (!query.trim()) return fetchNotes();

    try {
      setLoading(true);
      const res = await API.get(
        `/notes/search?query=${encodeURIComponent(query)}`,
      );
      // setNotes(res.data.notes || []);

      const sorted = [...(res.data.notes || [])].sort((a, b) => {
        if (a.pinned === b.pinned) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        }
        return a.pinned ? -1 : 1;
      });
      setNotes(sorted);
    } catch (err) {
      console.error("Search Error", err);
      setError(err.response?.data?.message || "Failed to search notes");
      toast.error("Failed to search notes");
    } finally {
      setLoading(false);
    }
  };

  //create new note
  const addNote = async (title, content, pinned = false, tags = []) => {
    try {
      const res = await API.post("/notes", { title, content, pinned, tags });
      // setNotes((prev)=>[res.data.note, ...prev]);
      fetchNotes();
      setError(null);
      toast.success("Note added successfully!");
      return res.data.note;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to add note";
      toast.error(message);
      throw message;
    }
  };

  //Edit Note
  const updateNote = async (id, updateData) => {
    try {
      const res = await API.put(`/notes/${id}`, updateData);
      // setNotes((prev) => prev.map((note) => (note._id === id ? res.data.note : note)));
      setNotes((prev) =>
        prev
          .map((note) => (note._id === id ? res.data.note : note))
          .sort((a, b) =>
            a.pinned === b.pinned
              ? new Date(b.updatedAt) - new Date(a.updatedAt)
              : a.pinned
                ? -1
                : 1,
          ),
      );

      toast.success("Note updated successfully!");
      return res.data.note;
    } catch (err) {
      // throw err.response?.data?.message || "Failed to update note";
      const message = err.response?.data?.message || "Failed to update note";
      toast.error(message);
      throw message;
    }
  };

  //delete note

  const deleteNote = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete note");
      throw err.response?.data?.message || "Failed to delete note";
    }
  };

  const togglePin = async (id) => {
    try {
      const note = notes.find((n) => n._id === id);
      if (!note) return;

      // Optimistic update — updates UI immediately
      setNotes((prev) =>
        prev.map((n) => (n._id === id ? { ...n, pinned: !note.pinned } : n)),
      );

      // Backend update — send ONLY pinned field
      const res = await API.put(`/notes/${id}`, { pinned: !note.pinned });

      // Update note with server response and sort pinned notes first
      setNotes((prev) =>
        prev
          .map((n) => (n._id === id ? res.data.note : n))
          .sort((a, b) =>
            a.pinned === b.pinned
              ? new Date(b.updatedAt) - new Date(a.updatedAt)
              : a.pinned
                ? -1
                : 1,
          ),
      );
    } catch (err) {
      toast.error("Failed to toggle pin");
    }
  };

  const exportNotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/notes/export", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        alert("Failed to export notes");
        return;
      }

      const text = await res.text(); // backend already sends plain text

      const blob = new Blob([text], { type: "text/plain" });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      const cd = res.headers.get("Content-Disposition");
      const match = cd?.match(/filename=(.+)/);

      a.href = url;
      a.download = match ? match[1] : "notes_export.txt";

      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------------------
  // IMPORT NOTES
  // ----------------------------
  const importNotes = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file); // backend expects field name "file"

      const res = await API.post("/notes/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(`${res.data.count} notes imported successfully`);
      fetchNotes();
    } catch (err) {
      toast.error("Import failed");
      console.error(err);
    }
  };

  const exportSingleNote = async (noteId, title) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/notes/export/${noteId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) {
        alert("Failed to export note");
        return;
      }

      const text = await res.text();

      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");

      const cd = res.headers.get("Content-Disposition");
      const match = cd?.match(/filename=(.+)/);

      a.href = url;
      a.download = match ? match[1] : `${title}.txt`;
      a.click();

      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && notes.length === 0) {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        loading,
        error,
        fetchNotes,
        addNote,
        updateNote,
        deleteNote,
        searchNotes,
        searchQuery,
        setSearchQuery,
        togglePin,
        exportNotes,
        importNotes,
        exportSingleNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;

// ----------------------------
// EXPORT NOTES
// ----------------------------
// const exportNotes = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const res = await fetch("http://localhost:5000/api/notes/export", {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${token}`,   // ⬅ ADD THIS
//       },
//     });

//     if (!res.ok) {
//       alert("Failed to export");
//       return;
//     }

//     const text = await res.text();

//     const blob = new Blob([text], { type: "application/json" });

//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");

//     const contentDisposition = res.headers.get("Content-Disposition");
//     const filenameMatch = contentDisposition?.match(/filename=(.+)/);

//     a.href = url;
//     a.download = filenameMatch ? filenameMatch[1] : "notes.json";

//     a.click();
//     URL.revokeObjectURL(url);

//   } catch (err) {
//     console.error(err);
//   }
// };

// const res = await API.put(`/notes/${id}`, updateData);
// setNotes((prev)=>
//     prev.map((note)=>(note._id===id ? res.data.note: note))
// );
// return res.data.note;

//fetch all notes
// const fetchNotes = async ()=>{
// try{
//     setLoading(true);
//     const res = await API.get('/notes');
//     setNotes(res.data.notes || []);
//     setError(null);
// }
// catch(err){
//     console.error("error fetching notes", err);
//     setError(err.response?.data?.message || "Failed to load notes");
// }finally{
//     setLoading(false);
// }
// };

// const deleteNote = async(id)=>{
// try{
//       await API.delete(`/notes/${id}`);
//       setNotes((prev) => prev.filter((note) => note._id !== id));
//       toast.success("Note deleted successfully!");
// }
// catch(err){
//     //   throw err.response?.data?.message || "Failed to delete note";
//     const message = err.response?.data?.message || "Failed to delete note";
//       toast.error(message); // ✅ Added
//       throw message;
// }
// }

// const searchNotes = async (query)=>{
//     if(!query.trim()){
//         fetchNotes();
//         return;
//     }

//     try{
//         setLoading(true);
//         const res = await API.get(`/notes/search?query=${encodeURIComponent(query)}`);
//         setNotes(res.data.notes || []);
//     }
//     catch(err){
//         console.error("Search Error", err);
//         setError(err.response?.data?.message || "Failed to serch Notes");
//     }
//     finally{
//         setLoading(false);
//     }
// }

//autoFetch  notes when already logged in
// useEffect(()=>{
//     fetchNotes();
// },[]);
