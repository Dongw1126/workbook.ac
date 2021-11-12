import React, { useState } from 'react';
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { NodeModel } from "@minoru/react-dnd-treeview";


import TreeInputModal from "../modal/TreeInputModal";
import TreeDeleteModal from "../modal/TreeDeleteModal";

import useDialog from "../../hooks/useDialog";
import problemListStore from "../../stores/ProblemListStore";
import * as Constants from "../../constants";

type Props = {
    node?: NodeModel;
};

function TreeContextMenu(props: Props) {
    const problemList = problemListStore;
    const [dialogOpen, handleClickOpen, handleClose] = useDialog();

    const [inputTitle, setInputTitle] = useState("");
    const [inputLabel, setInputLabel] = useState("");
    const [eventCode, setEventCode] = useState(0);


    const handleAddFolderOpen = ({ event }: any) => {
        handleClickOpen();

        setInputTitle("폴더 추가");
        setInputLabel("폴더 이름");
        setEventCode(Constants.ADD_FOLDER);
    };

    const handleEditFolderOpen = () => {
        handleClickOpen();
        setInputTitle("이름 바꾸기");
        setInputLabel("폴더 이름");
        setEventCode(Constants.EDIT_FOLDER);
    };

    const deleteNode = () => {
        problemList.deleteNode(props.node);
    };
    /*
    const addNode = () => {
        problemList.addFolder(props.node);
    }
    */
    return (
        <div>
            <Menu id={Constants.TREE_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item onClick={handleAddFolderOpen}>
                    <AddIcon style={{ marginRight: 5 }} />
                    폴더 추가
                </Item>
                <Item hidden={(typeof props.node === "undefined")} onClick={handleEditFolderOpen}>
                    <EditIcon style={{ marginRight: 5 }} />
                    이름 바꾸기
                </Item>
                <Item hidden={(typeof props.node === "undefined")} onClick={deleteNode}>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    폴더 삭제
                </Item>
            </Menu>
            <TreeInputModal
                inputTitle={inputTitle}
                inputLabel={inputLabel}
                node={props.node}
                open={dialogOpen}
                onClose={handleClose}
                eventCode={eventCode}
            />
        </div>
    );
}

export default TreeContextMenu;