import { WorkbookData } from "../../types/Types";
import WorkbookCard from "./WorkbookCard";


/**
 * 문제집 리스트 컴포넌트
 * 검색결과로 문제집 카드들을 나열
 */

type Props = {
    editable: boolean;
    data: WorkbookData[];
}

function WorkbookList(props: Props) {
    return(
        <div style={{ width: "60%", margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {props.data.map((item, index) => {
                return(
                    <WorkbookCard key={item.id} editable={props.editable} data={item} />
                )
            })}
        </div>
    );
}

export default WorkbookList;