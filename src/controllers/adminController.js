const debug = require("debug")("app:adminController");

const { MongoClient } = require("mongodb");

function adminController(nav) {
  const books = [
    {
      title: "War and Peace",
      genre: "Historical Fiction",
      author: "Vcitor Hugo",
      bookId: 656,
      read: false
    },
    {
      title: "Les Miserables",
      genre: "Historical Fiction",
      author: "Lev Nokalayvic",
      bookId: 24280,
      read: false
    },
    {
      title: "Time Aand Machine",
      genre: "Science Fiction",
      author: "H. G. Wells",
      bookId: 200,
      read: true
    },
    {
      title: "Journey Ti THe Center of the Earth",
      genre: "Science Fiction",
      author: "Jules Verne",
      bookId: 204,
      read: false
    },
    {
      title: "The Dark World",
      genre: "Fantasy",
      author: "Henry Kuttner",
      bookId: 24281,
      read: false
    },
    {
      title: "Hatchet (Brian's Saga, #1)",
      genre: "Fantasy",
      author: "Gary Paulsen",
      bookId: 50,
      read: false
    }
  ];

  function getIndex(req, res) {
    const url = "mongodb://127.0.0.1:27017";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("connected correctly to server");
        const db = client.db(dbName);

        const result = await db.collection("books").insertMany(books);

        res.json(result);
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    }());
  }
  return { getIndex };
}

module.exports = adminController;
