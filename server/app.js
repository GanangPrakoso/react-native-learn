require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const { connect } = require("./config/mongo");

const {
    typeDefs: bookTypeDefs,
    resolvers: bookResolvers,
} = require("./schemas/book");

const {
    typeDefs: authorTypeDefs,
    resolvers: authorResolvers,
} = require("./schemas/author");

const {
    typeDefs: postTypeDefs,
    resolvers: postResolvers,
} = require("./schemas/post");

const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers,
} = require("./schemas/user");
const { authentication } = require("./middlewares/auth");

const server = new ApolloServer({
    typeDefs: [bookTypeDefs, authorTypeDefs, postTypeDefs, userTypeDefs],
    resolvers: [bookResolvers, authorResolvers, postResolvers, userResolvers],
});

connect()
    .then(() => {
        console.log("connect to mongodb");
        return startStandaloneServer(server, {
            listen: { port: 4000 },
            context: ({ req }) => {
                return {
                    authentication: () => authentication(req),
                };
            },
        });
    })
    .then(({ url }) => {
        console.log(`🚀  Server ready at: ${url}`);
    });
