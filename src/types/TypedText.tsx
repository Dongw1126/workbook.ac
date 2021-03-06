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
        <div style={{lineHeight: '1.6', display: "flex" }} >
            <div style={{ marginRight: "16px" }}>{props.droppable ? "" : props.id}</div>
            <div style={{ marginRight: "16px" }}>
                <div>
                    {props.title}
                </div>
            </div>
        </div>
    );
}
// dangerouslySetInnerHTML={{ __html: props.title as string }}
export default ProblemDisplay;