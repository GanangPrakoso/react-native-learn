const Author = require("../models/author");

const typeDefs = `#graphql
  type Author {
    name: String
    age: Int
  }

  type Query {
    authors: [Author]
  }
`;

const resolvers = {
    Query: {
        authors: async () => {
            const arrAuthors = await Author.findAll();
            return arrAuthors;
        },
    },
};

module.exports = { typeDefs, resolvers };
