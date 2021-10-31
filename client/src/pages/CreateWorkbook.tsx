import React from "react";
import Split from 'react-split'
import WorkbookComponent from '../components/WorkbookComponent';
import SearchComponent from '../components/SearchComponent';

function CreateWorkbook() {
    return (
        <Split
            className="split"
            sizes={[40, 60]}
            minSize={300}
            gutterSize={10}
            cursor="col-resize"
        >
            <div style={{ margin: 10 }}>
                <WorkbookComponent/>
            </div>
            <div style={{ margin: 10 }}>
                <SearchComponent/>
            </div>
        </Split>
    );
}

export default CreateWorkbook;

/*
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
*/