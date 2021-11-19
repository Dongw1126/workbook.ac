import React from 'react';
import { Observer } from "mobx-react";
import problemListStore from '../stores/ProblemListStore'
import ProblemTreeTitle from './tree/ProblemTreeTitle';
import ProblemTree from './tree/ProblemTree';
import SampleData2 from "./tree/sample2.json";


/**
 * 문제집 컴포넌트
 */


const testData = Array.from({length: 150}, (v, i) => {
    const o =   {
        "id": i + 1000,
        "parent": 0,
        "droppable": false,
        "text": "node " + i,
        "data": {
          "level": 3,
          "problemId": 1234
        }
    };
    return o;
});

function WorkbookComponent() {
    const problemList = problemListStore;
    // problemList.setData(testData);
    problemList.setData(SampleData2);

    return (
        <Observer>
            {() => (
                <div style={{ overflow: "auto", height:"80vh" }}>
                    <hr style={{ borderTop: "3px double #bbb" }} />
                    <ProblemTreeTitle readonly={false}/>
                    <hr style={{ borderTop: "3px double #bbb" }} />
                    <ProblemTree canSort={true} />
                </div>)}
        </Observer>
    );
}

export default WorkbookComponent;
