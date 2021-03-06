const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({})
        .populate("user", { username: 1, name: 1 });
    response.json(blogs.map(b => b.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
    const body = request.body;
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id)
        return response.status(401)
            .json({ error: "token missing or invalid" });

    const user = await User.findById(decodedToken.id);

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
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!request.token || !decodedToken.id)
        return response.status(401)
            .json({ error: "token missing or invalid" });
    
    const blog = await Blog.findById(request.params.id);

    if (decodedToken.id.toString() !== blog.user.toString())
        return response.status(401)
            .json({ error: "this is not the authenticated user's blog" });

    await Blog.deleteOne(blog);

    response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.json(request.body);
});


module.exports = blogsRouter;
