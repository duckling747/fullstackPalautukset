const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
    response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
    const savedBlog
        = await new Blog(request.body).save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.json(request.body);
});

module.exports = blogsRouter;
