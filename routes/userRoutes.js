const express = require("express");
const router = express.Router();
const users = require("../data/users");

router.get("/", (req, res) => {
  res.json(users);
});

//get new user form
//register form
router.get("/addUser", (req, res) => {
  res.render("users", { users });
});
// Route to render a form for creating a new user
// router.get("/new", (req, res) => {
//   res.render("new-user");
// });
//to crate an element
router.post("/", (req, res) => {
  if (req.body.name && req.body.username && req.body.email) {
    const userExists = users.find((user) => user.username == req.body.username);
    if (userExists) {
      res.json({ error: "Username Already Taken" });
    }
    const user = {
      id: users.length > 0 ? users[users.length - 1].id + 1 : 0,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };
    users.push(user);
    res.status(201).json(user);
    res.redirect("/");
  } else {
    res.json({ error: "Insufficient Data" });
  }
});

//get user with id
router
  .route("/:id")
  .get((req, res, next) => {
    const user = users.find((user) => user.id == req.params.id);
    if (user) res.json(user);
    else next();
    // res.send(`Get user with id ${req.params.id}`);
  })
  .put((req, res, next) => {
    const user = users.find((u, i) => {
      if (u.id == req.params.id) {
        for (const key in req.body) {
          users[i][key] = req.body[key];
        }
        return true;
      } else next();
    });

    if (user) res.json(user);
    else next;
  })
  .delete((req, res, next) => {
    const user = users.find((user, i) => {
      if (user.id == req.params.id) {
        users.splice(i, 1);
        return true;
      }
    });
    if (user) res.json(user);
    else next();
  });
//to get an element with id
// router.get("/:id", (req, res) => {
//   res.send(`Get user with id ${req.params.id}`);// });-
// //
// router.put("/:id", (req, res) => {
//   res.send("create a new user");
// });
// router.delete("/:id", (req, res) => {
//   res.send("create a new user");
// });

module.exports = router;
