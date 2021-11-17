import React from "react";
import Split from 'react-split'
import WorkbookComponent from '../components/WorkbookComponent';
import SearchComponent from '../components/SearchComponent';

function CreateWorkbook() {
    return (
        <div style={{ height: "100%" }}>
            <Split
                className="split"
                sizes={[40, 60]}
                minSize={300}
                gutterSize={10}
                cursor="col-resize"
            >
                <div>
                    <WorkbookComponent/>
                </div>
                <div style={{ margin: 10 }}>
                    <SearchComponent/>
                </div>
            </Split>
        </div>
    );
}

export default CreateWorkbook;