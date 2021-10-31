import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import SearchList from "./SearchList";

type Props = {
    query: string;
};

const getResult = async(_query: string, _page=1) => {
    // if(_query.length === 0) _query="tier:b5..r1";
    const url = "https://solved.ac/api/v3/search/problem?query=" + _query + "&page=" + _page;
    // console.log(url);

    const response = await fetch(url);
    if(response.status === 200) {
        const body = await response.json();
        console.log(body)
        return body.items;
    }

    return response.status;
}

function SearchResult(props: Props) {
    const [resultData, setResultData] = useState<any>([]);
    const [status, setStatus] = useState(0);
    const [complete, setComplete] = useState(0);


    useEffect(() => {
        getResult(props.query)
        .then(res => {
            setComplete(0);
            // console.log(res)
            if(typeof res === "object") {
                setResultData(res)
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
            <SearchList key={props.query} data={resultData} />
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