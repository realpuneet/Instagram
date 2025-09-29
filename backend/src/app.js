const express = require("express");
const cookieParser =require("cookie-parser");
const app = express()
const path = require("path");

const userRouter = require("../src/routes/user.routes");
const postRouter = require("../src/routes/post.routes");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes implementation

app.use("/api/auth", userRouter);
app.use("/api/post", postRouter);

module.exports = app;