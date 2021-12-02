import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import WorkbookDeleteModal from "../modal/WorkbookDeleteModal";
import { WorkbookData } from '../../types/Types';
import useDialog from "../../hooks/useDialog";
import { useRouter } from "../../hooks/useRouter";
import * as Constants from "../../constants";

type Props = {
    data: WorkbookData;
}

function WorkbookContextMenu(props: Props) {
    const { history } = useRouter();
    const [inputModalOpen, handleInputModalOpen, handleInputModalClose] = useDialog();
    const [deleteModalOpen, handleDeleteModalOpen, handleDeleteModalClose] = useDialog();

    const goToEditPage = () => {
        history.push("/workbook/edit");
    };

    return (
        <div>
            <Menu id={Constants.WORKBOOK_CONTEXT_MENU_ID} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item onClick={goToEditPage}>
                    문제집 편집
                </Item>
                <Item>
                    이름 바꾸기
                </Item>
                <Item>
                    사진 바꾸기
                </Item>
                <Item onClick={handleDeleteModalOpen}>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    삭제하기
                </Item>
            </Menu>
            <WorkbookDeleteModal
                deleteTitle="삭제하기"
                name={props.data.title}
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
            />
        </div>
    );
}

export default WorkbookContextMenu;