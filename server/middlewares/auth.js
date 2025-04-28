const { GraphQLError } = require("graphql");
const { verifyToken } = require("../helpers/jwt");
const User = require("../models/user");
const { ObjectId } = require("mongodb");

const authentication = async (req) => {
    try {
        if (!req.headers.authorization) {
            throw new GraphQLError("invalid token", {
                extensions: { code: "BAD_USER_INPUT" },
            });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verifyToken(token);

        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new GraphQLError("invalid token", {
                extensions: { code: "BAD_USER_INPUT" },
            });
        }

        return {
            userId: new ObjectId(decoded.userId),
            email: decoded.email,
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    authentication,
};
