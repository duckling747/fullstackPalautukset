const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");


blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
        .populate("user", { username: 1, name: 1 });
    response.json(blogs.map(b => b.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;

    //const user = await User.findById(body.userId);
    const user = await User.findOne();

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

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