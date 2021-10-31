import React from "react";
import { Box } from "@mui/system";

type Props = {
    id?: number;
    title?: string;
    droppable?: boolean;
};

export const ProblemDisplay: React.FC<Props> = (props) => {
    return (
        <div style={{lineHeight: '1.6'}}>
            <Box sx={{ display: 'inline', mr: 2 }}>{props.droppable ? "" : props.id}</Box>
            <Box sx={{ display: 'inline' }}>{props.title}</Box>
        </div>
    );
};