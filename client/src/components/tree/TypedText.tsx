import React from "react";
import { Box } from "@mui/system";
import { ProblemData } from "./Types";

type Props = {
    data?: ProblemData;
    droppable?: boolean;
};

export const TypedText: React.FC<Props> = (props) => {
    return (
        <div>
            <Box sx={{ display: 'inline', mr: 2 }}>{props.droppable ? "" : props.data?.problemId}</Box>
            <Box sx={{ display: 'inline' }}>{props.data?.titleKo}</Box>
        </div>
    );
};