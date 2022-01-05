import { useTransition, useChain, animated, useSpringRef } from 'react-spring';
import { WorkbookDB } from '../../../models';
import WorkbookCard from "../../workbook/WorkbookCard";


/**
 * 문제집 리스트 컴포넌트
 * 검색결과로 문제집 카드들을 나열
 */

type Props = {
    editable: boolean;
    animated: boolean;
    data: WorkbookDB[];
}

function WorkbookSearchList(props: Props) {
    /*
    const transApi = useSpringRef()
    const transition = useTransition(props.data, {
      ref: transApi,
      trail: 400 / props.data.length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
    })

    useChain([transApi]);
    */

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {props.data.map(
                (item, index) => {
                    return(
                        <div style={{ display: "block" }}>
                            <WorkbookCard key={item.id} editable={props.editable} 
                            data={item} animated={props.animated} shadow={true} />
                        </div>
                    )
                }
            )}
        </div>
    );
}

/*
            {transition((style, item) => (
                <animated.div style={style}>
                    <WorkbookCard key={item.id} editable={props.editable} 
                    data={item} animated={props.animated} shadow={true} />
                </animated.div>
            ))}
*/

export default WorkbookSearchList;