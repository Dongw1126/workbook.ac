import React, { useEffect } from 'react';
import { Observer } from "mobx-react";
import problemListStore from '../../stores/ProblemListStore';
import ProblemTree from '../tree/ProblemTree';

import { TreeDataDB } from "../../models";
import { NodeModel } from '@minoru/react-dnd-treeview';
import { ProblemData } from '../../types/Types';

/*const testData = Array.from({length: 150}, (v, i) => {
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
});*/

type Props = {
    treeDB: TreeDataDB;
    editable: boolean;
    title?: string;
}

const problemList = problemListStore;

/**
 * 문제집 트리 출력 컴포넌트
 */
function Workbook(props: Props) {
    useEffect(() => {
        if (typeof props.treeDB.treeData !== "undefined") {
            problemList.setData(props.treeDB.treeData as unknown as NodeModel<ProblemData>[]);
        } else {
            problemList.setData([]);
        }
    }, [])

    return (
        <Observer>
            {() => (
                <div style={{ overflow: "auto", height: "80vh" }}>
                    {props.editable &&
                        <>
                            <hr style={{ borderTop: "3px double #bbb" }} />
                            <div style={{ fontSize: "1.7rem", fontWeight: 700, textAlign: "center"}}>
                                {props.title}
                            </div>
                            <hr style={{ borderTop: "3px double #bbb" }} />
                        </>}
                    <ProblemTree editable={props.editable} />
                </div>)}
        </Observer>
    );
}


export default Workbook;
