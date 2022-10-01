const express = require("express");
const {
  getNoteController,
  postNoteController,
  patchNoteController,
  deleteNoteController,
} = require("../controller/noteController");

//! express router
const router = express.Router();

//! GET = /
//! POST = /
router.route("/").get(getNoteController).post(postNoteController);

//! PATCH = /note/:id
//! DELETE = /note/:id
router
  .route("/note/:id")
  .patch(patchNoteController)
  .delete(deleteNoteController);

//! export router
module.exports = router;
