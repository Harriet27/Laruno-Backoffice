import React from "react";
import { render } from "@testing-library/react";
import Button from "./index.js";
import { BrowserRouter as Router } from "react-router-dom";

test("should not be allowed is disabled", () => {
    const { container } = render(<Button isDisabled></Button>);

    expect(container.querySelector("span.disabled")).toBeInTheDocument();
});
test("Should render loading", () => {
    const { container, getByText } = render(<Button isLoading></Button>);

    expect(getByText(/loading/i)).toBeInTheDocument();
    expect(container.querySelector("span")).toBeInTheDocument();
});

test("should a render <a> tag", () => {
    const { container } = render(<Button type="link" isExternal></Button>);

    expect(container.querySelector("a")).toBeInTheDocument();
});

test("should a render <Link> components ", () => {
    const { container } = render(
        <Router>
            <Button href="" type="link"></Button>
        </Router>
    );

    expect(container.querySelector("a")).toBeInTheDocument();
});
