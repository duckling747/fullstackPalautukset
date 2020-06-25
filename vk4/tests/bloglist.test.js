const listHelper = require("../utils/list_helper");
const testHelper = require("./test_helper");

const listWithOneBlog = testHelper.listWithOneBlog;
const blogs = testHelper.blogs;

test("dummy returns one", () => {
    const blogs = [];
    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {

    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test("list has a few blogs", () => {
        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(36);
    });

});

describe("favorite", () => {

    test("list has one blog", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual(listWithOneBlog[0]);
    });

    test("list has many blogs", () => {
        const result = listHelper.favoriteBlog(blogs);
        expect(result).toEqual(blogs[2]);
    });

});

describe("most active blogger", () => {

    test("list has one blog", () => {
        const result = listHelper.mostBlogs(listWithOneBlog);
        expect(result).toEqual({ author: "Edsger W. Dijkstra", blogs: 1 });
    });

    test("list with many blogs", () => {
        const res = listHelper.mostBlogs(blogs);
        expect(res).toEqual({ author: "Robert C. Martin", blogs: 3 });
    });

});

describe("most liked blogger", () => {

    test("list has one blog", () => {
        const res = listHelper.mostLikes(listWithOneBlog);
        expect(res).toEqual({ author: "Edsger W. Dijkstra", likes: 5 });
    });

    test("list has many", () => {
        const res = listHelper.mostLikes(blogs);
        expect(res).toEqual({ author: "Edsger W. Dijkstra", likes: 17 });
    });

});