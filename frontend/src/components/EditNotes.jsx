import React, { useRef, useState, useMemo, useEffect } from "react";
import { MdClose } from "react-icons/md";
import JoditEditor from "jodit-react";
import useNotes from "../hooks/useNotes";
import "jodit/es2021/jodit.min.css";
import toast from "react-hot-toast";


const EditNotes = ({ noteData, type, onClose, fetchNotes }) => {
  const { addNote, updateNote } = useNotes();
  const editor = useRef(null);

  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags?.join(", ") || "");
  const [pinned, setPinned] = useState(noteData?.pinned || false);

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  /* -------------------------------------------
     🔥 Dark mode detection (Works perfectly)
     ------------------------------------------- */
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => obs.disconnect();
  }, []);

  /* -------------------------------------------
     🔥 Jodit config (auto re-renders when theme changes)
     ------------------------------------------- */
const config = useMemo(
  () => ({
    readonly: false,
    placeholder: "Write your note...",
    height: 200,

    theme: isDark ? "dark" : "default",

    style: {
      background: isDark ? "#1F2937" : "#D6CCC2",
      color: isDark ? "#F3F4F6" : "#1F2937",
      minHeight: "180px",
      
    },

      toolbarAdaptive: false,
      toolbarSticky: false,

    uploader: {
      insertImageAsBase64URI: true,
    },

     // ⭐ Fix bullet list formatting
    cleanHTML: {
      replaceNBSP: false,
      cleanOnPaste: false,
      removeEmptyElements: false,
    },

    // ⭐ Ensure bullet lists stay intact
    enter: "P",
    defaultMode: "1",

    buttons: [
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "|",
      "image",
      "link",
      "|",
      "align",
      "undo",
      "redo",
    ],
  }),
  [isDark]
);

/* -------------------------------------------
   🔥 WORD COUNT (Optimized & Safe)
------------------------------------------- */
const wordCount = content
  ?.replace(/<[^>]*>/g, " ")
  ?.replace(/\s+/g, " ")
  ?.trim()
  .split(" ")
  .filter(Boolean).length || 0;



  /* -------------------------------------------
     🔥 Save note (Add + Edit)
     ------------------------------------------- */
  const handleSaveNote = async () => {
    const htmlContent = content?.trim();
const tagArray =
  tags.split(",").map(t => t.trim()).filter(Boolean);



    if (!title.trim()) return setError("Please enter a title");
    if (!htmlContent || htmlContent === "<p><br></p>" || htmlContent === "<p></p>")
      return setError("Please add some content");

    setError("");
    setSaving(true);

    try {
      if (type === "add") {
        await addNote(title, htmlContent, pinned, tagArray);
        fetchNotes();
      } else if (type === "edit" && noteData?._id) {
        await updateNote(noteData._id, { title, content: htmlContent, pinned, tags: tagArray, });
      }
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Error saving note");
    } finally {
      setSaving(false);
    }
  };

  /* -------------------------------------------
     🔥 Close background overlay
     ------------------------------------------- */
  // const handleBackgroundClose = () => {
  //   if (!saving && (title || content)) {
  //     if (!window.confirm("Discard changes?")) return;
  //   }
  //   onClose();
  // };

  const handleBackgroundClose = (e) => {
  if (e.target === e.currentTarget) {
    if (!saving && (title || content)) {
      if (!window.confirm("Discard changes?")) return;
    }
    onClose();
  }
};

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent z-50"
      onClick={handleBackgroundClose}
    >
      <div
        className="w-full max-w-3xl bg-[#E3D5CA] text-gray-900 dark:bg-gray-900 dark:bg-gray-900 dark:text-gray-100 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center absolute -top-3 -right-3 bg-gray-700 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white"
          onClick={onClose}
        >
          <MdClose className="text-lg" />
        </button>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">TITLE</label>
          <input
            type="text"
            className="text-2xl bg-transparent text-gray-900 dark:text-gray-100 border-b border-gray-300 dark:border-gray-700 pb-1 focus:border-blue-500 transition outline-none"
            placeholder="Enter note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm text-gray-600 dark:text-gray-400">CONTENT</label>
          <div className="rounded-lg border border-gray-300 dark:border-gray-700 overflow-hidden flex flex-col">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              onChange={(content) => setContent(content)}

              // onBlur={(newContent) => setContent(newContent)}
              //  onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
            Words: {wordCount}
          </p>

        </div>

            {/* Tags */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-sm text-gray-600 dark:text-gray-400">TAGS</label>
          <input
            type="text"
            placeholder="work, project, urgent"
            className="bg-transparent border-b border-gray-300 dark:border-gray-700 pb-1 outline-none"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Pin */}
        <div className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            checked={pinned}
            onChange={() => setPinned(!pinned)}
          />
          <label className="text-sm">Pin this note</label>
        </div>

        {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

        <button
          className="w-full mt-6 p-3 rounded-lg font-medium bg-[#8C7E73] hover:bg-[#8C7E80] dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition"
          onClick={handleSaveNote}
          disabled={saving}
        >
          {saving ? "Saving..." : type === "edit" ? "Update Note" : "Add Note"}
        </button>
      </div>
    </div>
  );
};

export default EditNotes;
