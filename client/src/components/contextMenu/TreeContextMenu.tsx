import { useEffect } from "react";

import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { NodeModel } from "@minoru/react-dnd-treeview";


import AddFolderModal from "../modal/AddFolderModal";
import DeleteModal from "../modal/DeleteModal";

import useDialog from "../../hooks/useDialog";
import * as Utils from "../tree/ProblemTreeUtils";
import { ProblemData } from "../Types";

import * as Constants from "../../constants";



type Props = {
    treeData: NodeModel<ProblemData>[];
    setTreeData: React.Dispatch<React.SetStateAction<NodeModel<ProblemData>[]>>;
    node?: NodeModel;
};

function TreeContextMenu(props: Props) {
    const [addFolderDialogOpen, addFolderHandleClickOpen, addFolderHandleClose] = useDialog();
    const deleteEventTODO = () => {

    };

    return (
        <div>
            <Menu id={Constants.TREE_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item onClick={addFolderHandleClickOpen}>
                    <AddIcon style={{ marginRight: 5 }}/>
                    폴더 추가
                </Item>
                <Item hidden={(typeof props.node === "undefined")} onClick={deleteEventTODO}>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    폴더 삭제
                </Item>
            </Menu>
            <AddFolderModal open={addFolderDialogOpen} onClose={addFolderHandleClose} />
        </div>
    );
}

export default TreeContextMenu;