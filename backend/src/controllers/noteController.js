const Note = require("../models/Note");
const { logger } = require("../logger/logger");
const multer = require("multer");

// Multer setup for import file
const upload = multer({ storage: multer.memoryStorage() });
exports.uploadMiddleware = upload.single("file");

// ---------------- CREATE NOTE ----------------
exports.createNote = async (req, res, next) => {
  const { title, content, pinned, tags } = req.body;
  const user = req.user;
  const reqId = req.id;

  if (!title?.trim()) {
    logger.warn({ reqId }, "Validation failed: title missing");
    return res.status(400).json({ error: true, message: "Title is required" });
  }

  if (!content?.trim()) {
    logger.warn({ reqId }, "Validation failed: content missing");
    return res
      .status(400)
      .json({ error: true, message: "Content is required" });
  }

  try {
    const note = await Note.create({
      user: user._id,
      title,
      content,
      pinned: pinned || false,
      tags: tags || [],
    });

    logger.info(
      { reqId, note: note._id, user: user._id, title: note.title },
      "Note created",
    );
    res
      .status(201)
      .json({ error: false, note, message: "Note added successfully" });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error creating note");
    next(err);
  }
};

// ---------------- GET NOTES ----------------
exports.getNotes = async (req, res, next) => {
  const user = req.user;
  const reqId = req.id;

  try {
    const notes = await Note.find({ user: user._id })
      .sort({ pinned: -1, updatedAt: -1 })
      .lean();

    logger.info(
      { reqId, user: user._id, count: notes.length },
      "Notes retrieved",
    );
    res.json({
      error: false,
      notes,
      count: notes.length,
      message: "All notes retrieved successfully",
    });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error retrieving notes");
    next(err);
  }
};

// ---------------- UPDATE NOTE ----------------
exports.updateNote = async (req, res, next) => {
  const reqId = req.id;
  const user = req.user;

  try {
    const { title, content, pinned, tags } = req.body;

    if (
      title === undefined &&
      content === undefined &&
      pinned === undefined &&
      tags === undefined
    ) {
      logger.warn({ reqId }, "Update note failed: no fields provided");
      return res
        .status(400)
        .json({ error: true, message: "No changes provided" });
    }

    const updateFields = {};

    if (title !== undefined) {
      if (!title.trim())
        return res.status(400).json({ message: "Title cannot be empty" });
      updateFields.title = title.trim();
    }

    if (content !== undefined) {
      const onlyPinnedUpdate =
        title === undefined && pinned !== undefined && tags === undefined;
      if (!onlyPinnedUpdate) {
        const clean = content.replace(/<[^>]*>/g, "").trim();
        if (!clean.length)
          return res.status(400).json({ message: "Content cannot be empty" });
      }
      updateFields.content = content;
    }

    if (pinned !== undefined) updateFields.pinned = pinned;
    if (tags !== undefined)
      updateFields.tags = tags.filter((t) => t.trim() !== "");

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: user._id },
      { $set: updateFields },
      { new: true, runValidators: true },
    );

    if (!note) {
      logger.warn(
        { reqId, noteId: req.params.id },
        "Note not found for update",
      );
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    logger.info({ reqId, noteId: note._id, title: note.title }, "Note updated");
    return res.json({
      error: false,
      note,
      message: "Note updated successfully",
    });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error updating note");
    next(err);
  }
};

// ---------------- DELETE NOTE ----------------
exports.deleteNote = async (req, res, next) => {
  const user = req.user;
  const noteId = req.params.id;
  const reqId = req.id;

  try {
    const note = await Note.findOneAndDelete({ _id: noteId, user: user._id });

    if (!note) {
      logger.warn(
        { reqId, noteId, user: user._id },
        "Note not found for deletion",
      );
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    logger.info(
      { reqId, noteId: note._id, title: note.title, user: user._id },
      "Note deleted",
    );
    res.json({ error: false, message: "Note deleted successfully" });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error deleting note");
    next(err);
  }
};

// ---------------- SEARCH NOTES ----------------
exports.searchNotes = async (req, res, next) => {
  const user = req.user;
  const reqId = req.id;
  const { query } = req.query;

  if (!query?.trim()) {
    logger.warn({ reqId, user: user?._id }, "Search Failed - query missing");
    return res
      .status(400)
      .json({ error: true, message: "Search query is required" });
  }

  try {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const matchingNotes = await Note.find({
      user: user._id,
      $or: [
        { title: { $regex: new RegExp(escapedQuery, "i") } },
        { content: { $regex: new RegExp(escapedQuery, "i") } },
        { tags: { $regex: new RegExp(escapedQuery, "i") } },
      ],
    }).sort({ updatedAt: -1 });

    logger.info(
      { reqId, user: user._id, query, results: matchingNotes.length },
      "Notes search Successful",
    );

    return res.json({
      error: false,
      notes: matchingNotes,
      message: "Notes matching the search query retrieved successfully",
    });
  } catch (err) {
    logger.error(
      { reqId, user: user?._id, error: err.message },
      "Error in Search Notes",
    );
    next(err);
  }
};

// ---------------- TOGGLE PIN ----------------
exports.togglePin = async (req, res, next) => {
  const reqId = req.id;

  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user._id });
    if (!note) {
      logger.warn(
        { reqId, noteId: req.params.id },
        "Pin toggle failed: Note not found",
      );
      return res.status(404).json({ error: true, message: "Note not found" });
    }

    note.pinned = !note.pinned;
    await note.save();

    const action = note.pinned ? "Note pinned" : "Note unpinned";
    logger.info({ reqId, noteId: note._id, title: note.title }, action);

    return res.json({ error: false, pinned: note.pinned, message: action });
  } catch (err) {
    logger.error({ reqId, error: err.message }, "Error toggling pin");
    next(err);
  }
};

// ---------------- IMPORT NOTES ----------------
exports.importNotes = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, message: "No file uploaded" });
    }

    let incomingNotes;

    try {
      incomingNotes = JSON.parse(req.file.buffer.toString("utf8"));
    } catch (err) {
      return res
        .status(400)
        .json({ error: true, message: "Invalid JSON file" });
    }

    if (!Array.isArray(incomingNotes)) {
      return res
        .status(400)
        .json({ error: true, message: "JSON must be an array of notes" });
    }

    // Add each note with the authenticated user
    const userId = req.user._id;

    const createdNotes = await Promise.all(
      incomingNotes.map(async (note) => {
        return await Note.create({
          user: userId,
          title: note.title || "Untitled",
          content: note.content || "",
          pinned: note.pinned || false,
          tags: note.tags || [],
        });
      }),
    );

    res.json({
      error: false,
      count: createdNotes.length,
      message: "Notes imported successfully",
    });
  } catch (err) {
    console.error("Import error:", err);
    res.status(500).json({ error: true, message: "Failed to import notes" });
  }
};

// ---------------- EXPORT NOTES AS TEXT ----------------
exports.exportNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ user: req.user._id }).lean();

    if (!notes.length)
      return res
        .status(404)
        .json({ error: true, message: "No notes found to export" });

    // convert each note into plain text format
    let output = "";

    notes.forEach((note) => {
      const plainContent = (note.content || "")
        .replace(/<[^>]+>/g, "") // remove HTML
        .replace(/&nbsp;/g, " ")
        .trim();

      output += `Title: ${note.title}

Content:
${plainContent}

-------------------------------

`;
    });

    const filename = `notes_export_${Date.now()}.txt`;

    // res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    res.setHeader("Content-Type", "text/plain");

    res.send(output);
  } catch (err) {
    next(err);
  }
};

// ---------------- EXPORT SINGLE NOTE AS TEXT ----------------
exports.exportSingleNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).lean();

    if (!note)
      return res.status(404).json({ error: true, message: "Note not found" });

    const plainContent = (note.content || "")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    const output = `Title: ${note.title}

Content:
${plainContent}
`;

    const filename = `${note.title.replace(/\s+/g, "_")}.txt`;

    // res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    res.setHeader("Content-Type", "text/plain");

    res.send(output);
  } catch (err) {
    next(err);
  }
};
