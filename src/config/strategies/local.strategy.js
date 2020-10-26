const passport = require("passport");
const { Strategy } = require("passport-local");
const debug = require("debug")("app:local.strategy");

const { MongoClient } = require("mongodb");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password"
      },
      (username, password, done) => {
        const url = "mongodb://127.0.0.1:27017";
        const dbName = "libraryApp";
        (async function mongo() {
          let client;
          try {
            client = await MongoClient.connect(url);
            debug("connected correctly to the server");

            const db = client.db(dbName);
            const col = db.collection("users");

            const user = await col.findOne({ username });
            if (user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (err) {
            debug(err.stack);
          }
          client.close();
        }());
      }
    )
  );
};
