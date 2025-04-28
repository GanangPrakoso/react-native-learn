const { GraphQLError } = require("graphql");
const Book = require("../models/book");
const arrBooks = [
    {
        title: "The Awakening",
        author: "Kate Chopin",
        id: 1,
    },
    {
        title: "City of Glass",
        author: "Paul Auster",
        id: 2,
    },
];

const typeDefs = `#graphql
  type Book {
    title: String
    author: String
    id: ID
  }

  type Query {
    books: [Book]
    bookById(id: ID): Book
  }

  type Mutation {
    addBook(title: String, author: String): Book
  }
`;
const resolvers = {
    Query: {
        books: async (_, __, contextValue) => {
            return arrBooks;
        },
        bookById: (_, args) => {
            const book = arrBooks.find((el) => el.id == args.id);
            if (!book) {
                throw new GraphQLError("book not found", {
                    extensions: { code: "DATA_NOT_FOUND" },
                });
            }

            return arrBooks.find((el) => el.id == args.id);
        },
    },
    Mutation: {
        addBook: async (_, args) => {
            const { title, author } = args;
            const bookNew = Book.addBook(title, author);
            return bookNew;
        },
    },
};

module.exports = { typeDefs, resolvers };
