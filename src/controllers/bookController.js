const debug = require("debug")("app:bookController");
const { MongoClient, ObjectID } = require("mongodb");

function bookController(bookService, nav) {
  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    // res.redirect("/auth/signin");
    // }
  }

  function getIndex(req, res) {
    const url = "mongodb://127.0.0.1:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("connected correctly to the server");
        const db = client.db(dbName);

        const col = await db.collection("books");

        const books = await col.find().toArray();
        res.render("booksListView", {
          books,
          title: "Library",
          nav
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  function getById(req, res) {
    const { id } = req.params;
    const url = "mongodb://127.0.0.1:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("connection success..");
        const db = client.db(dbName);
        const col = await db.collection("books");
        const book = await col.findOne({ _id: new ObjectID(id) });
        debug(book);
        book.details = await bookService.getBookById(book.bookId);
        res.render("bookView", {
          book,
          title: "Library",
          nav
        });
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }

  return {
    middleware,
    getIndex,
    getById
  };
}

module.exports = bookController;
