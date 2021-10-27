import React, { useEffect, useState } from "react";
import ProblemTree from "../tree/ProblemTree";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { ProblemData } from "../Types";

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
    console.log(url);

    const response = await fetch(url);
    const body = await response.json();

    return body.items;
}

function SearchResult(props: Props) {
    const [resultTree, setResultTree] = useState<NodeModel<ProblemData>[]>([]);

    useEffect(() => {
        getResult(props.query)
        .then(res => {
            setResultTree(processProblems(res))
            console.log("call");
        })
        .catch(err => console.log(err))
    }, [props.query]);

    return(
        <div>
            <ProblemTree json={resultTree}/>
        </div>
    );
}

export default SearchResult;