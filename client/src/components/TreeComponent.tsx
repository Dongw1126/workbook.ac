import React from 'react';
import ProblemTree from './tree/ProblemTree';
import SampleData from "./tree/sample.json";


function TreeComponent() {
    return(
        <ProblemTree json={SampleData}/>
    );
}

export default TreeComponent;
