const { ObjectId } = require("mongodb");
const { getDb } = require("../config/mongo");

class User {
    static async findByEmail(email) {
        return getDb().collection("users").findOne({
            email: email,
        });
    }
    static async findById(id) {
        return getDb()
            .collection("users")
            .findOne({
                _id: new ObjectId(id),
            });
    }
    static async getUserDetail(id) {
        try {
            const result = await getDb()
                .collection("users")
                .aggregate([
                    {
                        $match: {
                            _id: id,
                        },
                    },
                    // 2 lookup di bawah utk mendapatkan followers user yg login
                    {
                        $lookup: {
                            from: "follows",
                            localField: "_id",
                            foreignField: "followingId",
                            as: "followers",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "followers.followerId",
                            foreignField: "_id",
                            as: "userFollowers",
                        },
                    },
                    // 2 lookup setelah ini utk mendapatkan following user yg login
                    {
                        $lookup: {
                            from: "follows",
                            localField: "_id",
                            foreignField: "followerId",
                            as: "followings",
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "followings.followingId",
                            foreignField: "_id",
                            as: "userFollowings",
                        },
                    },
                ])
                .toArray();

            return result[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = User;
