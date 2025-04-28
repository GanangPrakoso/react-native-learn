require("dotenv").config();
const { ObjectId } = require("mongodb");
const { connect } = require("../config/mongo");

const posts = [
    {
        userId: "656550cd5b652e14358ead88",
        title: "Pengalaman Liburan di Pantai",
        body: "Hari ini saya pergi liburan ke pantai. Cuaca sangat cerah, dan air laut begitu jernih. Menikmati angin sepoi-sepoi pantai membuat liburan ini sangat menyenangkan.",
        tags: ["liburan", "pantai", "kesenangan"],
    },
    {
        userId: "656550cd5b652e14358ead88",
        title: "Resep Masakan Sederhana",
        body: "Hari ini saya ingin berbagi resep masakan sederhana. Bahan-bahan yang diperlukan mudah didapat, dan langkah-langkahnya pun simpel. Semoga bermanfaat!",
        tags: ["masakan", "resep", "sederhana"],
    },
    {
        userId: "656550cd5b652e14358ead88",
        title: "Pentingnya Olahraga Rutin",
        body: "Olahraga bukan hanya baik untuk kesehatan fisik, tetapi juga mental. Saya pribadi merasakan perubahan positif setelah rutin berolahraga. Yuk, jaga kesehatan bersama-sama!",
        tags: ["olahraga", "kesehatan", "aktivitas fisik"],
    },
    {
        userId: "656550cd5b652e14358ead88",
        title: "Review Film Terbaru",
        body: "Kemarin saya menonton film terbaru yang sangat menghibur. Cerita menarik, akting para aktor luar biasa, dan efek visualnya memukau. Recomended!",
        tags: ["film", "review", "hiburan"],
    },
    {
        userId: "656550cd5b652e14358ead88",
        title: "Tips Belajar Efektif",
        body: "Belajar bisa menjadi lebih efektif dengan beberapa tips sederhana. Salah satunya adalah membuat jadwal belajar yang teratur dan memberikan waktu istirahat yang cukup. Selamat belajar!",
        tags: ["belajar", "tips", "pembelajaran"],
    },
];

connect().then(async (database) => {
    const postDB = database.collection("posts");
    const newPosts = posts.map((el) => {
        el.userId = new ObjectId(el.userId);
        return el;
    });

    const result = await postDB.insertMany(newPosts);
    console.log(result);
});
