const debug = require("debug")("app:authController");
const { MongoClient } = require("mongodb");

function bookController(nav) {
  function signUp(req, res) {
    const { username, password } = req.body;
    const url = "mongodb://127.0.0.1:27017";
    const dbName = "libraryApp";
    (async function addUser() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected correctly to Server.");

        const db = client.db(dbName);

        const col = db.collection("users");
        const user = { username, password };

        const result = await col.insertOne(user);

        req.login(result.ops[0], () => {
          res.redirect("/auth/profile");
        });
      } catch (err) {
        debug(err.stack);
      }
    }());
  }

  function signin(req, res) {
    res.render("signin", {
      nav,
      title: "Sign In"
    });
  }

  function logout(req, res) {
    req.logout();
    res.redirect("/auth/signin");
  }

  function middleware(req, res, next) {
    if (req.user) next();
    else res.redirect("/");
  }

  function profile(req, res) {
    res.json(req.user);
  }

  return {
    signUp,
    signin,
    logout,
    middleware,
    profile
  };
}

module.exports = bookController;
