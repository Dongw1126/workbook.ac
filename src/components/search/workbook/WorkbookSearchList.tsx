import { useTransition, useChain, animated, useSpringRef } from 'react-spring';
import { WorkbookData } from "../../../types/Types";
import WorkbookCard from "../../workbook/WorkbookCard";


/**
 * 문제집 리스트 컴포넌트
 * 검색결과로 문제집 카드들을 나열
 */

type Props = {
    editable: boolean;
    data: WorkbookData[];
}

function WorkbookSearchList(props: Props) {
    const transApi = useSpringRef()
    const transition = useTransition(props.data, {
      ref: transApi,
      trail: 400 / props.data.length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
    })

    useChain([transApi]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {transition((style, item) => (
                <animated.div style={style}>
                    <WorkbookCard key={item.id} editable={props.editable} data={item} />
                </animated.div>
            ))}
        </div>
    );
}

        /*<div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {props.data.map((item, index) => {
                return (
                    <WorkbookCard key={item.id} editable={props.editable} data={item} />
                )
            })}
        </div>*/

export default WorkbookSearchList;