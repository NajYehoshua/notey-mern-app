const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./database/connet");
const notFoundMiddleware = require("./middleware/notFound");
const noteRoutes = require("./routes/noteRoutes");
const customErrorMiddleware = require("./middleware/customErrorMiddleware");
const app = express();

//! allow us to use environmental variables
dotenv.config();

//! allow cors
app.use(cors());

//! parse json payload
app.use(express.json());

//! parse body
app.use(express.urlencoded({ extended: true }));

//! Note routes
app.use("/api/v1", noteRoutes);

//! notFound middleware
app.use(notFoundMiddleware);

//! customError middleware
app.use(customErrorMiddleware);

//! start fn
const startServer = async () => {
  try {
    //! try to connect in mongo db
    await connectDB(process.env.MONGO_URL);

    //! listen request from client
    app.listen(process.env.PORT, () => {
      console.log("Server is running!", process.env.PORT);
    });
  } catch (err) {
    //! catch error
    console.log(err);
  }
};

//! call startServer fn
startServer();
