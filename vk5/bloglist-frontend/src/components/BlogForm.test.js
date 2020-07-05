import React from "react";
import BlogForm from "./BlogForm";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";

/*
* The form information is actually stored in the stateful variables in the
* "App"-module, so let's just test that the event handlers and the setters
* are being called with the correct values here
*/
test("blog creation form callback is done w/ correct information", () => {
  let tit = "", aut = "", url = "";

  const mockCreateBlogHandler = jest.fn(),
    mockSetAuthor = jest.fn(val => aut = val),
    mockSetTitle = jest.fn(val => tit = val),
    mockSetUrl = jest.fn(val => url = val);

  const component =
    render(<BlogForm handleCreateNewBlog={mockCreateBlogHandler}
      author={aut} title={tit}
      url={url}
      setAuthor={mockSetAuthor} setTitle={mockSetTitle}
      setUrl={mockSetUrl} />);

  const input_author = component.container.querySelector("#author"),
    input_url = component.container.querySelector("#url"),
    input_title = component.container.querySelector("#title");

  const expect_aut = "Muumi Pappa",
    expect_tit = "Muistelmat",
    expect_url = "www.muumientarinoita.org";

  fireEvent.change(input_author, {
    target: { value: expect_aut }
  });
  fireEvent.change(input_title, {
    target: { value: expect_tit }
  });
  fireEvent.change(input_url, {
    target: { value: expect_url }
  });

  const form = component.container.querySelector("form");
  fireEvent.submit(form);

  expect(mockCreateBlogHandler).toHaveBeenCalled();
  expect(tit).toBe(expect_tit);
  expect(aut).toBe(expect_aut);
  expect(url).toBe(expect_url);
});
