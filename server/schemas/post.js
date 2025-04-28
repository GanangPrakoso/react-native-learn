const redis = require("../config/redis");
const Post = require("../models/post");
const { ObjectId } = require('mongodb');

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
        postById(postId: ID!): Post
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
      const payload = await contextValue.authentication();
      console.log(payload, "< -- token");
      let result;

      const posts = await Post.getAllWithUser();
      result = posts;

      return result;
    },
    postById: async (_, args) => {
      try {
        const { postId } = args;
        const post = await Post.getById(postId);
        console.log(JSON.stringify(post, null, 2));
        return post;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addPost: async (_, args, contextValue) => {
      // const user = await contextValue.authentication();
      console.log('add post');
      try {
        const { title, body, tags } = args.post;
        // const userId = user.userId;
        const userId = new ObjectId('656550cd5b652e14358ead88');

        const result = await Post.create({ title, body, tags, userId });
        // cache invalidation

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
