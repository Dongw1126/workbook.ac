import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserStore from '../stores/UserStore';

import ScrollToTop from "./ScrollToTop";
import WorkbookSearch from "../pages/workbook/WorkbookSearch";
import EditWorkbook from "../pages/workbook/EditWorkbook";
import ReadWorkbook from '../pages/workbook/ReadWorkbook';
import MyWorkbook from "../pages/workbook/MyWorkbook";
import FavWorkbook from "../pages/workbook/FavWorkbook";
import Home from "../pages/Home";
import Nav from "../pages/Nav"
import Guide from '../pages/Guide';

function MainComponent() {
    const userStore = UserStore;
    useEffect(() => {
        userStore.updateUser();
    }, []);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/guide" component={Guide} />
                <Route exact path="/workbook/search" component={WorkbookSearch} />
                <Route exact path="/workbook/read" component={ReadWorkbook} />
                <Route exact path="/workbook/read/:id" component={ReadWorkbook} />
                <Route exact path="/workbook/edit" component={EditWorkbook} />
                <Route exact path="/workbook/edit/:id" component={EditWorkbook} />
                <Route exact path="/workbook/my" component={MyWorkbook} />
                <Route exact path="/workbook/fav" component={FavWorkbook} />
            </Switch>
        </BrowserRouter>
    );
}

export default MainComponent;
