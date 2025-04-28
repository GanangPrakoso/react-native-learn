require("dotenv").config();
const { connect } = require("../config/mongo");
const { hashPassword } = require("../helpers/bcrypt");

const users = [
    {
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        phone: "1-770-736-8031 x56442",
        address: {
            street: "Victor Plains",
            suite: "Suite 879",
            city: "Wisokyburgh",
        },
        password: "test123",
    },
    {
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        phone: "010-692-6593 x09125",
        address: {
            street: "Douglas Extension",
            suite: "Suite 847",
            city: "McKenziehaven",
        },
        password: "123test",
    },
    {
        name: "Clementine Bauch",
        username: "Samantha",
        email: "Nathan@yesenia.net",
        phone: "1-463-123-4447",
        address: {
            street: "Hoeger Mall",
            suite: "Apt. 692",
            city: "South Elvis",
        },
        password: "hai123",
    },
];

connect().then(async (database) => {
    const userDB = database.collection("users");
    const newUsers = users.map((el) => {
        el.password = hashPassword(el.password);
        return el;
    });

    const result = await userDB.insertMany(newUsers);
    console.log(result);
});
