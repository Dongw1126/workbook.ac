import React from 'react';
import ProblemTree from './tree/ProblemTree';
import SampleData from "./tree/sample.json";
import SampleData2 from "./tree/sample2.json";


/**
 * 문제집 컴포넌트
 */
function WorkbookComponent() {
    return(
        <div style={{overflow:"auto", height:"auto", marginTop: 5}}>
            <ProblemTree data={SampleData2} canSort={true} />
        </div>
    );
}

export default WorkbookComponent;
