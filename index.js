const express = require("express");
const app = express();
const port = 5000;
const users = require("./data/users");
app.use(express.json());
//Routes path
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const bodyParser = require("body-parser"); //to uSE patch and post

//EJS template engine

//middleware
//first express middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next(); // Call next middleware or route handler
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
//use path routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
// app.use(express.static("public"));

//********************* */
//home page
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});

//error handling middleware

app.use((req, res) => {
  res.status(404);
  res.json({ error: "resource not found..." });
});
//get test page
// app.get("/test", (req, res) => {
//   res.send("<h1>Hello world</h1>");
// });
//listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
