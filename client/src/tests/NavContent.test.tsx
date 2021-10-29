import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "../pages/Nav";

test("Navigation Bar Content", () => {
    const nav = render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
    );
    nav.getByText("Main");
    nav.getByText("Info");
});
