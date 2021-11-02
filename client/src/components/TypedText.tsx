import React from "react";
import { Box } from "@mui/system";

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
        <div style={{lineHeight: '1.6'}}>
            <Box sx={{ display: 'inline', mr: 2 }}>{props.droppable ? "" : props.id}</Box>
            <Box sx={{ display: 'inline' }}>{props.title}</Box>
        </div>
    );
}

export default ProblemDisplay;