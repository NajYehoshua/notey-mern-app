const express = require("express");
const {
  getNoteController,
  postNoteController,
} = require("../controller/noteController");

//! express router
const router = express.Router();

//! GET = /
//! POST = /
router.route("/").get(getNoteController).post(postNoteController);

//! export router
module.exports = router;
