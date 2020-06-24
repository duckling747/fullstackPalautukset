
const dummy = () => {
    return 1;
};

const totalLikes = blogs => {
    const sum = (totalLikes, blog) => totalLikes + blog.likes;
    return blogs.reduce(sum, 0);
};

const favoriteBlog = blogs => {
    return blogs.reduce(
        (prev, current) => prev.likes > current.likes ? prev : current
    );
};

const mostBlogs = blogs => {
    let writersCounts = {};
    blogs.forEach(blog => {
        writersCounts[blog.author] = (writersCounts[blog.author] || 0) + 1;
    });
    const winner = blogs
        .reduce(
            (prev, current) => 
                writersCounts[prev.author] > writersCounts[current.author]
                    ? prev
                    : current
        );
    return { author: winner.author, blogs: writersCounts[winner.author] };
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
};
