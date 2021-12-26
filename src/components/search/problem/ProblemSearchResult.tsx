import React, { useEffect } from "react";
import useSWR from 'swr'
import { CircularProgress } from "@mui/material";
import ProblemSearchList from "./ProblemSearchList";

type Props = {
    query: string;
    page: number;
    setLastPage: React.Dispatch<any>;
};


const fetcher = async (url: string) => {
    console.log("fetcher call");

    const res = await fetch(url)

    if (!res.ok) {
        const error = new Error();
        error.message = res.status + " 오류!";
        throw error
    }
    return res.json();
}

/**
 * 검색 결과 출력 컴포넌트
 * props.query 는 SearchBar 에서 입력한 데이터
 */
function ProblemSearchResult(props: Props) {
    const { data, error } = useSWR(props.query ?
        "https://solved.ac/api/v3/search/problem?query=" + props.query + "&page=" + props.page : null,
        fetcher
    );

    useEffect(() => {
        if(!error && data) {
            props.setLastPage(Math.ceil(data.count / 100));
        }
    }, [data, error])

    //빈 쿼리
    if (!props.query) {
        return (
            <div style={{ fontSize: 18, lineHeight: 2, margin: 10, marginTop: 15 }}>
                <div style={{ width: "40%", whiteSpace: "nowrap" }}>
                    <table style={{ width: "25vw", borderSpacing: "2vw 0" }}>
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
    // 에러 처리
    if (error) {
        return (
            <div style={{ fontSize: 34 }}>
                <p>
                    😵 {error.message} <br />
                    잠시 후에 다시 시도해 주세요
                </p>
            </div>
        );
    }
    // 데이터 로딩
    if (!data) {
        return (
            <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ m: 20 }} />
            </div>
        );
    } else {
        // 결과 없음
        if (data.items.length === 0) {
            return (
                <div style={{ fontSize: 20 }}>
                    <p style={{ textAlign: "center" }}>
                        😵 해당하는 문제가 없습니다! <br />
                    </p>
                </div>
            );
        }
        // 결과 출력
        return (
            <ProblemSearchList key={props.query} data={data.items} />
        );
    }
}

export default ProblemSearchResult;