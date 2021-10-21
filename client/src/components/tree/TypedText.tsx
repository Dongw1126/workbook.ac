import React from "react";
import { NodeModel } from "@minoru/react-dnd-treeview";
import { Box } from "@mui/system";
import { ProblemData } from "./Types";

type Props = {
    node: NodeModel<ProblemData>;
    droppable?: boolean;
};

export const ProblemDisplay: React.FC<Props> = (props) => {
    return (
        <div>
            <Box sx={{ display: 'inline', mr: 2 }}>{props.droppable ? "" : props.node.id}</Box>
            <Box sx={{ display: 'inline' }}>{props.node.text}</Box>
        </div>
    );
};