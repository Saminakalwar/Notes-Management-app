import React from 'react';
// import { FaDownload } from 'react-icons/fa';
import { MdCreate, MdDelete, MdPushPin, MdOutlinePushPin } from 'react-icons/md';
import {FaDownload} from 'react-icons/fa';

const NoteCard = ({
  _id,
  title,
  content,
  date,
  tags = [],
  pinned = false,
  onEdit,
  onDelete,
  onTogglePin,
  exportSingleNote
}) => {
  return (
    <>
      <div className="group relative rounded-xl p-4 bg-[#E3D5CA] dark:bg-gray-800 shadow-md hover:shadow-xl hover:scale-[1.08] transition-transform duration-300 ease-in-out h-[150px] flex flex-col">

              {/* ⭐ PIN ICON — top-right */}
            <button
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin();
        }}
        className="absolute top-2 right-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-yellow-500 transition"
      >

          {pinned ? (
            <MdPushPin className="text-lg" />
          ) : (
            <MdOutlinePushPin className="text-lg" />
          )}
        </button>

        {/* Title */}
        <h6 className="note-title-gradient text-sm font-semibold pr-6 mb-1">
          {title}
        </h6>

        {/* Date */}
        <span className="text-[10px] text-slate-500 mb-1">
          {date}
        </span>

        {/* Content */}
        <p
          className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-2"
          dangerouslySetInnerHTML={{ __html: content }}
        ></p>


        {/* Bottom section — Tags + Icons -> always aligned */}
        <div className="flex items-center justify-between mt-auto pt-0 border-t border-gray-200 dark:border-gray-700 h-[25px]">

          {/* TAGS WITH OVERFLOW ('…') */}
          <div className="flex items-center gap-0 max-w-[70%] overflow-hidden whitespace-nowrap text-ellipsis">
            {tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2 py-[2px] rounded-md text-[10px] text-gray-700 dark:text-gray-300 "
              >
                #{tag}
              </span>
            ))}

            {tags.length > 3 && (
              <span className="text-[10px] text-gray-500">…</span>
            )}
          </div>

          {/* EDIT + DELETE ICONS */}
          <div className="flex gap-2">
              <button onClick={() => exportSingleNote(_id, title)}>

                <FaDownload className="text-[13px] opacity-80 hover:opacity-100" />
              </button>


            <MdCreate
              data-testid="edit-icon"
              className="icon-btn text-green-500 hover:text-green-600"
              onClick={onEdit}
            />

            <MdDelete
              data-testid="delete-icon"
              className="icon-btn text-red-700 hover:text-red-500"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this note?")) {
                  onDelete();
                }
              }}
            />
          </div>

        </div>

      </div>
    </>
  );
};

export default NoteCard;
