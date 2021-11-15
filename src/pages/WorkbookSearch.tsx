import React from 'react';
import { Link, BrowserRouter, Route, Switch } from "react-router-dom";
import EditWorkbook from "./EditWorkbook";

function WorkbookSearch() {

    return (
        <div>
            문제집 둘러보기
            <Link to="/workbook/edit">
                문제집 편집
            </Link>
        </div>
    );
}

export default WorkbookSearch;