import React from 'react';
import ProblemTree from './tree/ProblemTree';
import SampleData from "./tree/sample.json";
import SampleData2 from "./tree/sample2.json";


function WorkbookComponent() {
    return(
        <ProblemTree data={SampleData2} canSort={true} />
    );
}

export default WorkbookComponent;
