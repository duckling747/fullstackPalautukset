
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

module.exports = {
    dummy, totalLikes, favoriteBlog
};
