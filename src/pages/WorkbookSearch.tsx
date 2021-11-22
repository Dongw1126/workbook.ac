import React from 'react';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import WorkbookList from "../components/workbook/WorkbookList";
import example_wb from "../components/workbook/example_wb.json"
import { WorkbookData } from '../components/types/Types';

function WorkbookSearch() {
    return (
        <div>
            <div>
                <WorkbookList data={example_wb}/>
            </div>
        </div>
    );
}

export default WorkbookSearch;