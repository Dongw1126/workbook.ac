import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import SearchList from "./SearchList";

type Props = {
    query: string;
};

const SEARCH_LOADING = 0;
const SEARCH_COMPLETE = 1;
const SEARCH_EMPTY = 2;
const SEARCH_ERROR = 3;

const getResult = async (_query: string, _page = 1) => {
    console.log("getResult call");

    const url = "https://solved.ac/api/v3/search/problem?query=" + _query + "&page=" + _page;
    // console.log(url);

    const response = await fetch(url);
    if (response.status === 200) {
        const body = await response.json();
        console.log(body)
        return body.items;
    }

    return response.status;
}

/**
 * 검색 결과 출력 컴포넌트
 * props.query 는 SearchBar 에서 입력한 데이터
 */
function SearchResult(props: Props) {
    const [resultData, setResultData] = useState<any>([]);
    const [status, setStatus] = useState(0);
    const [complete, setComplete] = useState(0);


    useEffect(() => {
        if (props.query !== "") {
            getResult(props.query)
                .then(res => {
                    setComplete(SEARCH_LOADING);
                    // console.log(res)
                    if (typeof res === "object") {
                        setResultData(res)
                        setComplete(SEARCH_COMPLETE);
                    }
                    else {
                        setStatus(res);
                        setComplete(SEARCH_ERROR);
                    }
                })
                .catch(err => console.log(err))
        } else {
            setComplete(SEARCH_EMPTY);
        }
    }, [props.query]);

    /*useEffect(() => {
        console.log(complete);
    });*/

    if (complete === SEARCH_LOADING) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    }
    else if (complete === SEARCH_COMPLETE) {
        return (
            <SearchList key={props.query} data={resultData} />
        );
    }
    else if (complete === SEARCH_EMPTY) {
        return (
            <div style={{ fontSize: 18, lineHeight: 2, margin: 10, marginTop: 15 }}>
                <div style={{ width: "40%", whiteSpace: "nowrap"}}>
                    <table style={{ width: "25vw", borderSpacing: "2vw 0"}}>
                        <tbody>
                            <tr><td>tier:</td><td>난이도 필터</td></tr>
                            <tr><td>solved:</td><td>푼 사람 수 필터</td></tr>
                            <tr><td>average_try:</td><td>평균 시도 횟수 필터</td></tr>
                            <tr><td>tag:</td><td>태그 필터</td></tr>
                            <tr><td>from:</td><td>출처 필터</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    else {
        return (
            <div style={{ fontSize: 38 }}>
                <p>
                    😵 {status} 오류! <br />
                    잠시 후에 다시 시도해 주세요
                </p>
            </div>
        );
    }
}

export default SearchResult;