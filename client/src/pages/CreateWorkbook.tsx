import React from "react";
import WorkbookComponent from '../components/WorkbookComponent';
import SearchComponent from '../components/SearchComponent';

function CreateWorkbook() {
    return (
        <div style={{ width: "100%" }}>
            <div style={{ width: "40%", float: "left", boxSizing: "border-box" }}>
                <div style={{ margin: "5%" }}>
                    <WorkbookComponent/>
                </div>
            </div>
            <div style={{ width: "60%", float: "right", boxSizing: "border-box" }}>
                <div style={{ margin: "5%" }}>
                    <SearchComponent/>
                </div>
            </div>
        </div>
    );
}

export default CreateWorkbook;