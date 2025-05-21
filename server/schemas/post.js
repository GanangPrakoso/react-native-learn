const redis = require("../config/redis");
const Post = require("../models/post");

const typeDefs = `#graphql
    type Post {
        _id: ID
        userId: String
        title: String
        body: String
        tags: [String]
        user: [User]
    }
    
    type User {
        _id: ID
        username: String
        email: String
        phone: String
        address: Address
    }

    type Query {
        posts: [Post]
        postById(postId: ID!): String
    }

    input newPost {
        title: String!
        body: String!
        tags: [String]
    }

    type Mutation {
        addPost(post: newPost): String
        addComment(postId: ID, content: String): String
    }
`;

const resolvers = {
    Query: {
        posts: async (_, __, contextValue) => {
            const user = await contextValue.authentication();
            try {
                // ngeget data ke mongodb
                // cache => kita simpan data post ke dalam cache sehingga ketika ada request berikutnya
                // tidak perlu lagi request ke mongodb
                const postCache = await redis.get(`${user.userId}:post:all`);
                let result;

                if (false) {
                    result = JSON.parse(postCache);
                    console.log("dari cache");
                } else {
                    const posts = await Post.getAllWithUser({
                        userId: user.userId,
                    });
                    await redis.set(
                        `${user.userId}:post:all`,
                        JSON.stringify(posts)
                    );
                    console.log("dari mongodb");
                    result = posts;
                }
                return result;
            } catch (err) {
                throw err;
            }
        },
        postById: async (_, args) => {
            try {
                const { postId } = args;
                const post = await Post.getById(postId);
                console.log(JSON.stringify(post, null, 2));
                return "OK";
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        addPost: async (_, args, contextValue) => {
            const user = await contextValue.authentication();
            try {
                const { title, body, tags } = args.post;
                const userId = user.userId;

                const result = await Post.create({ title, body, tags, userId });
                // cache invalidation
                await redis.del(`${user.userId}:post:all`);

                return result;
            } catch (err) {
                throw err;
            }
        },
        addComment: async (_, args, contextValue) => {
            const user = await contextValue.authentication();
            try {
                const { postId, content } = args;
                const { userId } = user;

                const result = await Post.addComment(postId, {
                    content,
                    authorId: userId,
                });

                return result;
            } catch (err) {
                throw err;
            }
        },
    },
};

module.exports = { typeDefs, resolvers };
