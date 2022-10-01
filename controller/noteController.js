const Note = require("../model/note");
const asyncHandler = require("../middleware/asyncHandler");
const createCustomError = require("../error/customError");

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
    return res.status(400).json({ msg: "Please dont leave the form blank!" });
  }

  //! create new note
  const note = await Note.create({
    title,
    body,
  });

  //! check if creating note is successful
  if (!note) {
    //! throw a custom error to customErrorMiddleware
    next(createCustomError("Failed to create new note", 400));
  }

  //! respond to client
  res.status(200).json(note);
});

module.exports = {
  getNoteController,
  postNoteController,
};
