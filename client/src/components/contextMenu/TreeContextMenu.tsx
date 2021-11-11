import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { NodeModel } from "@minoru/react-dnd-treeview";


import AddFolderModal from "../modal/AddFolderModal";
import DeleteModal from "../modal/DeleteModal";

import useDialog from "../../hooks/useDialog";
import problemListStore from "../../stores/ProblemListStore";
import * as Constants from "../../constants";



type Props = {
    node?: NodeModel;
};

function TreeContextMenu(props: Props) {
    const problemList = problemListStore;
    const [dialogOpen, handleClickOpen, handleClose] = useDialog();

    const deleteNode = () => {
        problemList.deleteNode(props.node);
    };

    const addNode = () => {
        problemList.addFolder(props.node);
    }

    return (
        <div>
            <Menu id={Constants.TREE_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item onClick={addNode}>
                    <AddIcon style={{ marginRight: 5 }}/>
                    폴더 추가
                </Item>
                <Item hidden={(typeof props.node === "undefined")} onClick={deleteNode}>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    폴더 삭제
                </Item>
            </Menu>
            <AddFolderModal open={dialogOpen} onClose={handleClose} />
        </div>
    );
}

export default TreeContextMenu;