const { ObjectId } = require("mongodb");
const { getDb, client } = require("../config/mongo");

class Post {
    static async getAll(query) {
        return getDb().collection("posts").find().toArray();
    }
    static async getAllWithUser(query) {
        return getDb()
            .collection("posts")
            .aggregate([
                {
                    $sort: { title: -1 },
                },
                // {
                //     $match: query,
                // },
                {
                    $lookup: {
                        from: "users",
                        localField: "userId",
                        foreignField: "_id",
                        as: "user",
                    },
                },
            ])
            .toArray();
    }
    static async create(post) {
        const session = client.startSession();
        try {
            session.startTransaction();
            await getDb().collection("posts").insertOne(post, { session });
            await getDb()
                .collection("users")
                .findOneAndUpdate(
                    {
                        _id: post.userId,
                    },
                    { $inc: { postCount: 1 } },
                    { session }
                );
            await session.commitTransaction();
            return "Success to add new post";
        } catch (err) {
            console.log("An error occurred during the transaction:" + err);
            await session.abortTransaction();
            throw err;
        } finally {
            await session.endSession();
        }
    }

    static async addComment(postId, comment) {
        try {
            await getDb()
                .collection("posts")
                .findOneAndUpdate(
                    {
                        _id: new ObjectId(postId),
                    },
                    {
                        $addToSet: { comments: comment },
                    }
                );
            return "Success to add new comment";
        } catch (err) {
            throw err;
        }
    }
    static async getById(postId) {
        try {
            const result = await getDb()
                .collection("posts")
                .aggregate([
                    {
                        $match: {
                            _id: new ObjectId(postId),
                        },
                    },
                    {
                        $lookup: {
                            from: "users", // Nama koleksi users
                            localField: "comments.authorId",
                            foreignField: "_id",
                            pipeline: [{ $project: { username: 1 } }],
                            as: "commentUsers",
                        },
                    },
                ])
                .toArray();

            if (result.length === 0) {
                throw new Error("not found");
            }

            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Post;
