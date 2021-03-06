import React from "react";
import ProblemSearchItem from "./ProblemSearchItem";

type Props = {
    data: any[];
};

/**
 * 문제 검색 결과 리스트 컴포넌트
 * props.data 는 SearchResult 로부터 solved.ac에서 검색 결과
 */
function ProblemSearchList(props: Props) {
    return(
        <div>
            {props.data.map(
                (item, index) => {
                    return(
                        <ProblemSearchItem 
                            key={item.problemId}
                            id={item.problemId} 
                            level={item.level} 
                            title={item.titleKo}
                            voteCnt={item.votedUserCount}
                        />
                    );
                }
            )}
        </div>
    );
}

export default ProblemSearchList;
