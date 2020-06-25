const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const testHelper = require("./test_helper");

const api = supertest(app);

const blogs = testHelper.blogs;


beforeEach(async () => {
    await Blog.deleteMany({});
    for (const element of blogs)
        await new Blog(element).save();
});


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
    for (const element of blogs) {
        expect(element).toBeDefined();
        expect(element).toHaveProperty("id");
        expect(element).not.toHaveProperty("_id");
    }
});

test("POST increases blog count by one and adds correct stuff", async() => {
    const newBlog = { 
        _id: "5a422ba71b54a676234d17f0", 
        title: "Binary B-Trees for Virtual Memory", 
        author: "Rudolf Bayer", 
        url: "https://dl.acm.org/doi/10.1145/1734714.1734731",
        likes: 1000, 
        __v: 0 
    };
    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    const blogs = await testHelper.blogsInDb();
    expect(blogs).toHaveLength(testHelper.blogs.length + 1);
    const contents = blogs.map(b => b.title);
    expect(contents).toContain("Binary B-Trees for Virtual Memory");
});

afterAll(() => {
    mongoose.connection.close();
});
