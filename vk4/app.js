const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const usersRouter = require("./controllers/users");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose
    .connect(config.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info("Connected to mongo...");
    })
    .catch(error => {
        logger.error("Error connecting to mongo:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

module.exports = app;