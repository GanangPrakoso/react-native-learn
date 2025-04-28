const { ObjectId } = require("mongodb");
const { connect } = require("../config/mongo");
class Book {
    static async addBook(title, author) {
        const db = await connect();
        const books = db.collection("books");
        const bookAdded = await books.insertOne({
            title,
            author,
        });
        //   let newBook = { title, author, id: arrBooks.length + 1 };
        //   arrBooks.push(newBook);
        const bookNew = await db.collection("books").findOne({
            _id: new ObjectId(bookAdded.insertedId),
        });
        return bookNew;
    }
}

module.exports = Book;
