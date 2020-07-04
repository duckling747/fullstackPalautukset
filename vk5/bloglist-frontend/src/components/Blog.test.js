import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("renders title and author only", () => {
  const blog = {
    author: "Jallu",
    title: "Jallun bloki",
    url: "www.jallu.org",
    likes: 100,
    user: {
      name: "nimi",
      username: "uname",
    }
  };
  const component = render(
    <Blog blog={blog} />
  );
  expect(component.container).toHaveTextContent(
    `${blog.title}; ${blog.author}`
  );
  const togglableDiv = component.container.querySelector(".togglableContent");
  const defaultDiv = component.container.querySelector(".defaultContent");

  expect(togglableDiv).toHaveStyle(
    "display: none"
  );

  expect(defaultDiv).not.toHaveStyle(
    "display: none"
  );
});
