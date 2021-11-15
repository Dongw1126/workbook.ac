import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WorkbookSearch from "../pages/WorkbookSearch";
import EditWorkbook from "../pages/EditWorkbook";
import Home from "../pages/Home";
import Info from "../pages/Info"
import Nav from "../pages/Nav"

function MainComponent() {
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/info" component={Info} />
                <Route exact path="/workbook/search" component={WorkbookSearch} />
                <Route exact path="/workbook/edit" component={EditWorkbook} />
            </Switch>
        </BrowserRouter>
    );
}

export default MainComponent;
