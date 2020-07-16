
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

const getWinner = (blogs, map) => {
    return blogs
        .reduce(
            (prev, current) =>
                map[prev.author] > map[current.author]
                    ? prev
                    : current
        );
};

const mostBlogs = blogs => {
    let writersCounts = {};
    blogs.forEach(blog => {
        writersCounts[blog.author] = (writersCounts[blog.author] || 0) + 1;
    });
    const winner = getWinner(blogs, writersCounts);
    return { author: winner.author, blogs: writersCounts[winner.author] };
};

const mostLikes = blogs => {
    let writerLikes = {};
    blogs.forEach(blog => {
        writerLikes[blog.author]
            = (writerLikes[blog.author] || 0) + blog.likes;
    });
    const winner = getWinner(blogs, writerLikes);
    return { author: winner.author, likes: writerLikes[winner.author] };
};

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};
