import React from 'react';
import { Observer } from "mobx-react";
import problemListStore from '../stores/ProblemListStore'
import ProblemTree from './tree/ProblemTree';
import SampleData2 from "./tree/sample2.json";


/**
 * 문제집 컴포넌트
 */
function WorkbookComponent() {
    const problemList = problemListStore;
    problemList.setData(SampleData2);

    return (
        <Observer>
            {() => (
                <div style={{ overflow: "auto", height:"490px" }}>
                    <ProblemTree data={SampleData2} canSort={true} />
                </div>)}
        </Observer>
    );
}

export default WorkbookComponent;
