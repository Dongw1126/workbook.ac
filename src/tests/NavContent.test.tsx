import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Nav from "../pages/Nav";
import '@testing-library/jest-dom';

test("Navigation Bar Content", () => {
    const nav = render(
        <BrowserRouter>
            <Nav />
        </BrowserRouter>
    );
    nav.getByText("Main");
    nav.getByText("Info");
});
