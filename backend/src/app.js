const express = require("express");
const cookieParser =require("cookie-parser");
const app = express()
const path = require("path");
const cors = require("cors");

const authRouter = require("../src/routes/auth.routes");
const postRouter = require("../src/routes/post.routes");
const userRouter = require("../src/routes/user.routes");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes implementation
app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/users", userRouter)

module.exports = app;