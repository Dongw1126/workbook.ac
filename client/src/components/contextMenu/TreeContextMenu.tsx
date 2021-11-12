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
    const [inputModalOpen, handleInputModalOpen, handleInputModalClose] = useDialog();
    const [deleteModalOpen, handleDeleteModalOpen, handleDeleteModalClose] = useDialog();

    const [modalTitle, setModalTitle] = useState("");
    const [inputLabel, setInputLabel] = useState("");
    const [eventCode, setEventCode] = useState(0);


    const handleAddFolderOpen = () => {
        handleDeleteModalClose();
        handleInputModalOpen();

        setModalTitle("폴더 추가");
        setInputLabel("폴더 이름");
        setEventCode(Constants.ADD_FOLDER);
    };
    const handleEditFolderOpen = () => {
        handleInputModalClose();
        handleInputModalOpen();

        setModalTitle("이름 바꾸기");
        setInputLabel("폴더 이름");
        setEventCode(Constants.EDIT_FOLDER);
    };

    return (
        <div>
            <Menu id={Constants.TREE_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item 
                    hidden={!((typeof props.node === 'undefined') || props.node?.droppable)} 
                    onClick={handleAddFolderOpen}>
                    <AddIcon style={{ marginRight: 5 }} />
                    폴더 추가
                </Item>
                <Item hidden={(typeof props.node === "undefined") || !props.node?.droppable} onClick={handleEditFolderOpen}>
                    <EditIcon style={{ marginRight: 5 }} />
                    이름 바꾸기
                </Item>
                <Item hidden={(typeof props.node === "undefined")} onClick={handleDeleteModalOpen}>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    삭제하기
                </Item>
            </Menu>
            <TreeInputModal
                inputTitle={modalTitle}
                inputLabel={inputLabel}
                node={props.node}
                open={inputModalOpen}
                onClose={handleInputModalClose}
                eventCode={eventCode}
            />
            <TreeDeleteModal
                deleteTitle="삭제하기"
                node={props.node}
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
            />
        </div>
    );
}

export default TreeContextMenu;