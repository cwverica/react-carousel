import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

// smoke test
it("shouldn't crash and burn", () => {
    render(<App />);
});

// snapshot test
it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment).toMatchSnapshot();
});

