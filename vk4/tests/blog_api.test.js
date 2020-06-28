const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const testHelper = require("./test_helper");

const api = supertest(app);

const User = require("../models/user");

const blogs = testHelper.blogs;

let TOKENSTRING;

beforeAll(async () => {
    await User.deleteMany({});
    const user = {
        username: "moomin1337", 
        name: "Muumi Pappa", 
        password: "aidosti_salainen"};
    await testHelper
        .createUser(user, api)
        .expect(201);
    const resp = await api
        .post("/api/login")
        .send(user)
        .expect(200);
    TOKENSTRING = `Bearer ${resp.body.token}`;
});

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
});

describe("GET request", () => {

    test("GET returns json, correct statuscode and correct amount", async () => {
        const res
            = await api
                .get("/api/blogs")
                .expect(200)
                .expect("Content-Type", /application\/json/);
        expect(res.body).toHaveLength(blogs.length);
    });
    
    test("identifier field is named \"id\" and not \"_id\"", async () => {
        const blogs = await testHelper.blogsInDb();
        blogs.forEach(b => {
            expect(b).toBeDefined();
            expect(b).toHaveProperty("id");
            expect(b).not.toHaveProperty("_id");
        });
    });

});

describe("POST request", () => {

    test("POST increases blog count by one and adds correct stuff", async() => {
        await testHelper.sendMe(testHelper.newBlog, api)
            .set("Authorization", TOKENSTRING)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        const retBlogs = await testHelper.blogsInDb();
        expect(retBlogs).toHaveLength(blogs.length + 1);
        const contents = retBlogs.map(b => b.title);
        expect(contents).toContain("Binary B-Trees for Virtual Memory");
    });
    
    test("Uninitialized likes-field gets default value 0", async() => {
        let newBlog = { ...testHelper.newBlog };
        delete newBlog.likes;
        await testHelper.sendMe(newBlog, api)
            .set("Authorization", TOKENSTRING);
        const blogs = await testHelper.blogsInDb();
        const addedBlog = blogs.find(b => b.title === newBlog.title);
        expect(addedBlog).toHaveProperty("likes", 0);
    });
    
    test("if no title and no url, then respond with status 400", async() => {
        let newBlog = { ...testHelper.newBlog };
        delete newBlog.url;
        delete newBlog.title;
        await testHelper.sendMe(newBlog, api)
            .set("Authorization", TOKENSTRING)
            .expect(400);
    });

    test("POST fails w/out a token w/ 401 status", async() => {
        let newBlog = { ... testHelper.newBlog };
        await testHelper.sendMe(newBlog, api)
            .expect(401);
    });

});

describe("DELETE request", () => {

    let id;

    beforeEach(async () => {
        await testHelper.sendMe(testHelper.newBlog, api)
            .set("Authorization", TOKENSTRING);
        const retBlogs = await testHelper.blogsInDb();
        expect(retBlogs).toHaveLength(blogs.length + 1);
        id = retBlogs.find(b => b.title === testHelper.newBlog.title).id;
    });

    test("removing by id works", async() => {
        await api
            .delete(`/api/blogs/${id}`)
            .set("Authorization", TOKENSTRING)
            .expect(204);
        const retBlogs = await testHelper.blogsInDb();
        expect(retBlogs).toHaveLength(blogs.length);
    });
    
});

describe("PUT request", () => {
    
    test("can update likes using PUT", async() => {
        const newLikes = 99999999;
        let retBlogs = await testHelper.blogsInDb();
        const updateMe = { ...retBlogs[0], likes: newLikes};
        await api
            .put(`/api/blogs/${updateMe.id}`)
            .send(updateMe)
            .expect(200);
        retBlogs = await testHelper.blogsInDb();
        const updated = retBlogs.find(b => b.id === updateMe.id);
        expect(updated.likes).toBe(newLikes);
    });
    
});


afterAll(() => {
    mongoose.connection.close();
});
