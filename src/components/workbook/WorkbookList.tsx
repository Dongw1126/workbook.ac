import { WorkbookData } from "../types/Types";
import WorkbookCard from "./WorkbookCard";


/**
 * 문제집 리스트 컴포넌트
 * 검색결과로 문제집 카드들을 나열
 */

type Props = {
    data: WorkbookData[];
}

function WorkbookList(props: Props) {
    return(
        <div>
            <WorkbookCard data={props.data[0]} />
        </div>
    );
}

export default WorkbookList;