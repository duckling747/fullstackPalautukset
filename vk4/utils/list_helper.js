
const dummy = () => {
    return 1;
};

const totalLikes = blogs => {
    const sum = (totalLikes, blog) => totalLikes + blog.likes;
    return blogs.reduce(sum, 0);
};

module.exports = {
    dummy, totalLikes
};
