import React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
// import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import AddIcon from '@mui/icons-material/Add';

import WorkbookList from "../../components/search/workbook/WorkbookSearchList";
import example_wb_my from "../../components/workbook/example_wb_my.json"

function MyWorkbook() {
    return (
        <div>
            <div style={{ textAlign: "center", margin: "2rem 0", fontSize: "3rem", fontWeight: 700 }}>
                나의 문제집
            </div>
            <SpeedDial
                ariaLabel="Add Workbook"
                icon={<AddIcon />}
                onClick={() => {console.log("clicked")}}
            />
            <div>
                <WorkbookList editable={true} data={example_wb_my} />
            </div>
        </div>
    );
}

export default MyWorkbook;