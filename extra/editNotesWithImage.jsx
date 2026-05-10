import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

import useNotes from "../hooks/useNotes";



import { FaBold, FaItalic, FaUnderline, FaStrikethrough,FaListUl,FaListOl} from "react-icons/fa";

// const Toolbar = ({ editor, onImageUpload }) => {
  const Toolbar = ({ editor }) => {
  if (!editor) return null;

  const buttonClass =
    "p-2 rounded hover:bg-gray-100 transition text-gray-600 active:bg-gray-200";
  const activeClass = "bg-blue-100 text-blue-600";

  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-50 border-t border-gray-200 rounded-b-lg p-2">
      <div className="flex gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${buttonClass} ${
            editor.isActive("bold") ? activeClass : ""
          }`}
          title="Bold"
        >
          <FaBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${buttonClass} ${
            editor.isActive("italic") ? activeClass : ""
          }`}
          title="Italic"
        >
          <FaItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${buttonClass} ${
            editor.isActive("underline") ? activeClass : ""
          }`}
          title="Underline"
        >
          <FaUnderline />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${buttonClass} ${
            editor.isActive("strike") ? activeClass : ""
          }`}
          title="Strikethrough"
        >
          <FaStrikethrough />
        </button>

        {/* ✅ Working bullet + numbered lists */}
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${buttonClass} ${
            editor.isActive("bulletList") ? activeClass : ""
          }`}
          title="Bullet List"
        >
          <FaListUl />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${buttonClass} ${
            editor.isActive("orderedList") ? activeClass : ""
          }`}
          title="Numbered List"
        >
          <FaListOl />
        </button>

        {/* Image Upload
        <button
          onClick={onImageUpload}
          className={buttonClass}
          title="Insert Image"
        >
          <FaImage />
        </button> */}
      </div>
    </div>
  );
};

const EditNotes = ({ noteData, type, onClose, fetchNotes }) => {
  // const {addNote, updateNote, fetchNotes} = useNotes();
  const {addNote, updateNote} = useNotes();
  const [title, setTitle] = useState(noteData?.title || "");
  //  const [content, setContent] = useState(noteData?.content || "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false); 
  // const {fetchNotes} = useNotes();

  // const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      // ✅ Disable built-in lists before re-importing
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        underline:false,
      }),
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      // Image.configure({
      //   HTMLAttributes: { class: "rounded-md my-2 max-w-full" },
      // }),
    ],
    content: noteData?.content || "",
    editorProps: {
      attributes: {
        class:
          "ProseMirror w-full min-h-[200px] p-3 outline-none text-sm text-gray-800 bg-white",
      },
    },
  });

  const handleSaveNote =async()=>{
    const content = editor?.getHTML();
    if(!title.trim())
      return setError("Please enter a title");
    
   if(!content || content ==="<p></p>")
      return setError("Please add some content");
      setError("");
      setSaving(true);

      try{
        if(type === "add"){
          await addNote(title, content);
          fetchNotes();// refresh after add/update
        }
        else if(type ==="edit" && noteData?._id){
          await updateNote(noteData._id, {title, content})
        }
        onClose();
      }
      catch(err){
        setError(err.response?.data?.message || "Error saving note");
      }finally{
        setSaving(false);
      }
    
  }

  return (
    <div className="relative">
      {/* Close Button */}
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none border-b border-gray-200 pb-1 focus:border-blue-400 transition"
          placeholder="Enter note title..."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <div className="rounded-lg border border-gray-200 overflow-hidden flex flex-col">
          <EditorContent editor={editor} />
          <Toolbar editor={editor}/>
          {/* <Toolbar editor={editor} onImageUpload={openFilePicker} /> */}
        </div>
      </div>

      
      {/* Hidden Image Input
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      /> */}

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        onClick={handleSaveNote}
        disabled={saving}
      >
        {saving ? "Saving..." : type === "edit" ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default EditNotes;




  // const handleImageUpload = (event) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const base64 = reader.result;
  //     editor?.chain().focus().setImage({ src: base64 }).run();
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const openFilePicker = () => fileInputRef.current?.click();

  // const handleAddNote = () => {
  //   if (!title.trim()) {
  //     setError("Please Enter the Title");
  //     return;
  //   }
  //   const content = editor?.getHTML();
  //   if (!content || content === "<p></p>") {
  //     setError("Please enter the content");
  //     return;
  //   }
  //   setError("");
  //   console.log({ title, content });
  //   onClose();
  // };