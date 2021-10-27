import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import ProblemTree from "../tree/ProblemTree";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../Types";
import SampleData2 from "../tree/sample2.json";

type Props = {
    query: string;
};

function processProblems(items: any) {
    let ret: NodeModel<ProblemData>[] = [];

    Object.values(items).forEach((item:any) => {
        const tmp: NodeModel<ProblemData> = {
            id: item.problemId,
            parent: 0,
            droppable: false,
            text: item.titleKo,
            data: {
                level: item.level,
                problemId: item.problemId  
            } 
        }
        ret.push(tmp)
    });
    console.log(ret);
    return ret;
}

const getResult = async(_query: string, _page=1) => {
    if(_query.length === 0) _query="tier:b5..r1";
    const url = "https://solved.ac/api/v3/search/problem?query=" + _query + "&page=" + _page;
    // console.log(url);

    const response = await fetch(url);
    const body = await response.json();

    return body.items;
}

function SearchResult(props: Props) {
    const [resultTree, setResultTree] = useState<NodeModel<ProblemData>[]>([]);
    const [complete, setComplete] = useState(0);


    useEffect(() => {
        getResult(props.query)
        .then(res => {
            setComplete(0);
            setResultTree(processProblems(res))
            // console.log("call");
            setComplete(1);
        })
        .catch(err => console.log(err))
    }, [props.query]);

    /*useEffect(() => {
        console.log(complete);
    });*/

    return(
        <div>
            {
                complete ?
                <ProblemTree key={props.query} json={resultTree} /> :
                <CircularProgress />
            } 
        </div>
    );
}

export default SearchResult;