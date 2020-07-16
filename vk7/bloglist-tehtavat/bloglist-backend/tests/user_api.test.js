const bcrypt = require("bcrypt");
const User = require("../models/user");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const helper = require("./test_helper");


describe("when there is initially one user at db", () => {

    let usersAtStart;

    beforeAll(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ username: "root", passwordHash });
        await user.save();
    });

    beforeEach(async () => {
        usersAtStart = await helper.usersInDb();
    });

    test("creation succeeds with a fresh username", async () => {
        const user = {
            username: "mluukkai", 
            name: "Matti Luukkainen", 
            password: "salainen"};
        await helper
            .createUser(user, api)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
        const usernames = usersAtEnd.map(u => u.username);
        expect(usernames).toContain(user.username);
    });

    test("duplicate user not accepted", async() => {
        const user = { username: "root", password: "salanen" };
        const res = await helper
            .createUser(user, api)
            .expect(400);
        expect(res.body.error).toContain("expected `username` to be unique");
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length);
    });
});

describe("erroneous user is not accepted", () => {

    beforeAll( async () => {
        await User.deleteMany({});
    });

    afterEach( async () => {
        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(0);
    });

    test("no password", async () => {
        const user = { username: "rooster", name: "Rooster Roosterson" };
        const res = await helper
            .createUser(user, api)
            .expect(400);
        expect(res.body.error).toContain("Password too short or missing");
    });
    test("too short password", async() => {
        const user = { username: "jsparr",
            name: "Jack Sparrow", password: "pw" };
        const res = await helper
            .createUser(user, api)
            .expect(400);
        expect(res.body.error).toContain("Password too short or missing");
    });
    test("too short username", async() => {
        const user = { username: "bb",
            name: "Barbossa Whatsitsname", password: "password" };
        const res = await helper
            .createUser(user, api)
            .expect(400);
        expect(res.body.error).toContain("shorter than the minimum");
    });
    test("no username", async() => {
        const user = { name: "The other pirates", password: "asdf" };
        const res = await helper
            .createUser(user, api)
            .expect(400);
        expect(res.body.error).toContain("Path `username` is required");
    });

});

afterAll(() => {
    mongoose.connection.close();
});
