import React from 'react';
import WorkbookList from "../../components/workbook/WorkbookList";
import example_wb from "../../components/workbook/example_wb.json"

function WorkbookSearch() {
    return (
        <div>
            <div>
                <WorkbookList editable={false} data={example_wb}/>
            </div>
        </div>
    );
}

export default WorkbookSearch;