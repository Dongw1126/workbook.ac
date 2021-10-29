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
    // if(_query.length === 0) _query="tier:b5..r1";
    const url = "https://solved.ac/api/v3/search/problem?query=" + _query + "&page=" + _page;
    // console.log(url);

    const response = await fetch(url);
    if(response.status === 200) {
        const body = await response.json();
        return body.items;
    }

    return response.status;
}

function SearchResult(props: Props) {
    const [resultTree, setResultTree] = useState<NodeModel<ProblemData>[]>([]);
    const [status, setStatus] = useState(0);
    const [complete, setComplete] = useState(0);


    useEffect(() => {
        getResult(props.query)
        .then(res => {
            setComplete(0);
            // console.log(res)
            if(typeof res === "object") {
                setResultTree(processProblems(res))
                setComplete(1);
            }
            else {
                setStatus(res);
                setComplete(2);
            }
        })
        .catch(err => console.log(err))
    }, [props.query]);

    /*useEffect(() => {
        console.log(complete);
    });*/
    
    if (complete === 0) {
        return (
            <div style={{ textAlign: "center"}}>
                <CircularProgress sx={{ m: 20 }}/>
            </div>
        );
    }
    else if (complete === 1) {
        return (
            <ProblemTree key={props.query} data={resultTree} canSort={false} />
        );
    }
    else {
        return (
            <div style={{fontSize: 38}}>
                <p>
                    😵 {status} 오류! <br/>
                    잠시 후에 다시 시도해 주세요
                </p>
            </div>
        );
    }
}

export default SearchResult;