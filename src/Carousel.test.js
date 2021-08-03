import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("shouldn't crash and burn", () => {
  render(<Carousel />);
});

// snapshot test
it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // move back in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("should not show left arrow at first", () => {
  const { queryByTestId } = render(<Carousel />);

  expect(queryByTestId("left-arrow")).toBe(null);
  expect(queryByTestId("right-arrow")).not.toBe(null);
});

it("should show both arrows on the second image", () => {
  const { queryByTestId } = render(<Carousel />);

  fireEvent.click(queryByTestId("right-arrow"));

  expect(queryByTestId("left-arrow")).not.toBe(null);
  expect(queryByTestId("right-arrow")).not.toBe(null);
});

it("should not show right arrow on last image", () => {
  const { queryByTestId } = render(<Carousel />);

  fireEvent.click(queryByTestId("right-arrow"));
  fireEvent.click(queryByTestId("right-arrow"));

  expect(queryByTestId("left-arrow")).not.toBe(null);
  expect(queryByTestId("right-arrow")).toBe(null);
});