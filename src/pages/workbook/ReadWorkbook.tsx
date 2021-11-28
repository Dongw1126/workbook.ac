import { useState } from "react";
import Workbook from '../../components/workbook/Workbook';
import WorkbookCard from "../../components/workbook/WorkbookCard";
import ProblemSearch from '../../components/search/problem/ProblemSearch';
import CloseIcon from '@mui/icons-material/Close';
import example_wb from "../../components/workbook/example_wb.json"

function ReadWorkbook() {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <WorkbookCard editable={false} data={example_wb[0]} />
            </div>
            <div style={{ width: "60%", margin: "auto" }}>
                <Workbook editable={false} />
            </div>
        </div>
    );
}

export default ReadWorkbook;