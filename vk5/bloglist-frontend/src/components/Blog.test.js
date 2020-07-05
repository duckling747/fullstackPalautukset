import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";


const noneDisplayStyle = "display: none";

let blog;

beforeAll(() => {
  blog = {
    author: "Jallu",
    title: "Jallun bloki",
    url: "www.jallu.org",
    likes: 100,
    user: {
      name: "nimi",
      username: "uname",
    }
  };
});

test("renders title and author only", () => {
  const component = render(
    <Blog blog={blog} />
  );

  expect(component.container).toHaveTextContent(
    `${blog.title}; ${blog.author}`
  );
  const togglableDiv = component.container.querySelector(".togglableContent");
  const defaultDiv = component.container.querySelector(".defaultContent");

  expect(togglableDiv).toHaveStyle(noneDisplayStyle);

  expect(defaultDiv).not.toHaveStyle(noneDisplayStyle);
});

test("renders url and likes after button press", () => {
  const component = render(
    <Blog blog={blog} />
  );

  const togglableDiv = component.container.querySelector(".togglableContent");
  const defaultDiv = component.container.querySelector(".defaultContent");

  const button = component.getByText("view");
  fireEvent.click(button);
  expect(togglableDiv).not.toHaveStyle(noneDisplayStyle);
  expect(defaultDiv).toHaveStyle(noneDisplayStyle);
});

test("like button pressed twice -> event handler called twice", () => {
  const mockFunc = jest.fn();

  const component = render(
    <Blog blog={blog} sendLikeHandlerProp={mockFunc} />
  );

  const button = component.getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  //expect(mockHandler.mock.calls).toHaveLength(2);
  expect(mockFunc).toHaveBeenCalledTimes(2);

});





