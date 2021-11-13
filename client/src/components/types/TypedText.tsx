import React from "react";

type Props = {
    id?: number;
    title?: string;
    droppable?: boolean;
};

/**
 * 문제 출력 컴포넌트
 */
function ProblemDisplay(props: Props) {
    return (
        <div style={{lineHeight: '1.6'}} >
            <div style={{ display:'inline', marginRight: "16px" }}>{props.droppable ? "" : props.id}</div>
            <div style={{ 
                display:'inline', 
                marginRight: "16px",
            }} dangerouslySetInnerHTML={{ __html: props.title as string }}></div>
        </div>
    );
}

export default ProblemDisplay;