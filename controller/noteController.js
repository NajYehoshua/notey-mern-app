const Note = require("../model/note");
const asyncHandler = require("../middleware/asyncHandler");
const { createCustomError } = require("../error/customError");

//! GET
//! desc - GET all notes
const getNoteController = asyncHandler(async (req, res) => {
  //! Get notes from DB
  const notes = await Note.find();

  //! Check if notes arrive
  if (!notes) {
    //! throw a custom error to customErrorMiddleware
    next(createCustomError("Failed to get your notes", 400));
  }

  //! respond to client
  res.status(200).json({ results: [...notes] });
});

//! POST
//! desc - CREATE new note
const postNoteController = asyncHandler(async (req, res) => {
  //! GET client data
  const { title, body } = req.body;

  //! Check if client data is empty
  if (!(title && body)) {
    //! return next to stop the req/res cycle
    return res.status(400).json({ msg: "Please dont leave the form blank!" });
  }

  //! create new note
  const note = await Note.create({
    title,
    body,
  });

  //! check if creating note is successful
  if (!note) {
    //! return next to stop the req/res cycle
    return next(createCustomError("Failed to create new note", 400));
  }

  //! respond to client
  res.status(200).json(note);
});

//! PATCH
//! desc - UPDATE existing note
const patchNoteController = asyncHandler(async (req, res, next) => {
  //! Get Note id
  const { id: noteId } = req.params;

  //! Get client input
  const { title, body } = req.body;

  //! Find and update existing note
  const patchNote = await Note.findByIdAndUpdate(
    noteId,
    { title, body },
    { new: true }
  );

  //! check if successful
  if (!patchNote) {
    //! return next to stop the req/res cycle
    return next(
      createCustomError(`This note _id: ${noteId} does not exist!`, 400)
    );
  }

  //! respond to client
  res.status(200).json(patchNote);
});

//! DELETE
//! desc - DELETE existing note
const deleteNoteController = asyncHandler(async (req, res, next) => {
  //! Get note id
  const { id: noteId } = req.params;

  //! Delete existing note
  const deletedNote = await Note.findByIdAndDelete(noteId);

  //! Check if successful
  if (!deletedNote) {
    //! return next to stop the req/res cycle
    return next(
      createCustomError(`This note _id: ${noteId} does not exist!`, 400)
    );
  }

  //! respond to client
  res.status(200).json(deletedNote);
});

//! exports controller
module.exports = {
  getNoteController,
  postNoteController,
  patchNoteController,
  deleteNoteController,
};
