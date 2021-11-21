import React from 'react';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import WorkbookList from "../components/workbook/WorkbookCard";

function WorkbookSearch() {

    return (
        <div>
            <div>
                <WorkbookList />
            </div>
        </div>
    );
}

export default WorkbookSearch;