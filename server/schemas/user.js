const { GraphQLError } = require("graphql");
const User = require("../models/user");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");

const typeDefs = `#graphql
  type User {
    _id: ID
    username: String
    email: String
    phone: String
    address: Address
  }

  type Address {
    street: String
    suite: String
    city: String
  }

  type Token {
    accessToken: String
  }

  type Query {
    getUserDetail: User
  }

  type Mutation {
    login(email: String!, password: String!): Token
  }
`;

const resolvers = {
    Query: {
        getUserDetail: async (_, __, contextValue) => {
            try {
                const user = await contextValue.authentication();

                const profile = await User.getUserDetail(user.userId);

                return profile;
            } catch (err) {
                throw err;
            }
        },
    },

    Mutation: {
        login: async (_, args) => {
            try {
                const { email, password } = args;
                const user = await User.findByEmail(email);

                if (!user) {
                    throw new GraphQLError("email/password invalid", {
                        extensions: { code: "BAD_USER_INPUT" },
                    });
                }

                const validated = comparePassword(password, user.password);

                if (!validated) {
                    throw new GraphQLError("email/password invalid", {
                        extensions: { code: "BAD_USER_INPUT" },
                    });
                }

                const token = {
                    accessToken: signToken({
                        userId: user._id,
                        email: user.email,
                    }),
                };

                return token;
            } catch (err) {
                throw err;
            }
        },
    },
};

module.exports = { typeDefs, resolvers };
