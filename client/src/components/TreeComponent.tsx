import React from 'react';
import ProblemTree from './tree/ProblemTree';
import SampleData from "./tree/sample.json";
import SampleData2 from "./tree/sample2.json";


function TreeComponent() {
    return(
        <ProblemTree json={SampleData2}/>
    );
}

export default TreeComponent;
