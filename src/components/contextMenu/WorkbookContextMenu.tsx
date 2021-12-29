import React, { useState } from 'react';
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import WorkbookTitleModal from "../modal/WorkbookTitleModal";
import WorkbookDeleteModal from "../modal/WorkbookDeleteModal";
import WorkbookImageModal from "../modal/WorkbookImageModal";
import { WorkbookDB } from '../../models';
import useDialog from "../../hooks/useDialog";
import { useRouter } from "../../hooks/useRouter";
import * as Constants from "../../constants";

type Props = {
    data: WorkbookDB;
}

function WorkbookContextMenu(props: Props) {
    const { history } = useRouter();
    const [titleModalOpen, handleTitleModalOpen, handleTitleModalClose] = useDialog();
    const [deleteModalOpen, handleDeleteModalOpen, handleDeleteModalClose] = useDialog();
    const [imageModalOpen, handleImageModalOpen, handleImageModalClose] = useDialog();

    const goToEditPage = () => {
        history.push(`/workbook/edit/${props.data.id}`);
    };

    return (
        <div>
            <Menu id={props.data.id} style={{ zIndex: Constants.CONTEXT_MENU_Z_INDEX }}>
                <Item onClick={goToEditPage}>
                    문제집 편집
                </Item>
                <Item onClick={handleTitleModalOpen}>
                    이름 바꾸기
                </Item>
                <Item onClick={handleImageModalOpen}>
                    표지 바꾸기
                </Item>
                <Item onClick={handleDeleteModalOpen}>
                    <DeleteForeverIcon style={{ marginRight: 5 }} />
                    삭제하기
                </Item>
            </Menu>
            <WorkbookDeleteModal
                deleteTitle="삭제하기"
                data={props.data}
                open={deleteModalOpen}
                onClose={handleDeleteModalClose}
            />
            <WorkbookTitleModal 
                id={props.data.id}
                title={props.data.title}
                open={titleModalOpen}
                onClose={handleTitleModalClose}
            />
            <WorkbookImageModal 
                data={props.data}
                open={imageModalOpen}
                onClose={handleImageModalClose}
            />
        </div>
    );
}

export default WorkbookContextMenu;