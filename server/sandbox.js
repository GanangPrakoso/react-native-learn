const { MongoClient, ObjectId } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://whardian:ZIy4b0TCjOZ5Nksy@cluster0.x87lot3.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db("BookStore");
    const movies = database.collection("authors");
    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: "Back to the Future" };
    // const result = await movies.insertOne({
    //   name: "Deddy",
    //   age: 30,
    //   points: [20, 30, 10],
    // });
    // console.log(result, "<< result");

    await movies.updateOne(
      { _id: new ObjectId("6564454ba1a0c016c76ec8cb") },
      { $push: { points: 55 } }
    );
    const movie = await movies.find().toArray();
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
