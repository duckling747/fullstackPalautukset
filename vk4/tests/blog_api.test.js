const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const testHelper = require("./test_helper");

const api = supertest(app);

const blogs = testHelper.blogs;


beforeEach(async () => {
    await Blog.deleteMany({});
    // for (const element of blogs)
    //    await new Blog(element).save();
    await Blog.insertMany(blogs);
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
    await testHelper.sendMe(testHelper.newBlog, api)
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
    await testHelper.sendMe(newBlog, api);
    const blogs = await testHelper.blogsInDb();
    const addedBlog = blogs.find(b => b.id === newBlog._id);
    expect(addedBlog).toHaveProperty("likes", 0);
});

test("if no title and no url, then respond with status 400", async() => {
    let newBlog = { ...testHelper.newBlog };
    delete newBlog.url;
    delete newBlog.title;
    await testHelper.sendMe(newBlog, api)
        .expect(400);
});

afterAll(() => {
    mongoose.connection.close();
});
