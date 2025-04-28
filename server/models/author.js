const { getDb } = require("../config/mongo");
class Author {
    static async findAll() {
        const authors = getDb().collection("authors");
        const arrAuthors = await authors.find().toArray();
        return arrAuthors;
    }
}
module.exports = Author;
