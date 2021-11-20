import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WorkbookSearch from "../pages/WorkbookSearch";
import WorkbookEdit from "../pages/WorkbookEdit";
import Home from "../pages/Home";
import Nav from "../pages/Nav"
import Guide from '../pages/Guide';

function MainComponent() {
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/guide" component={Guide} />
                <Route exact path="/workbook/search" component={WorkbookSearch} />
                <Route exact path="/workbook/edit" component={WorkbookEdit} />
            </Switch>
        </BrowserRouter>
    );
}

export default MainComponent;
